import { id, StableBTreeMap } from 'azle';
import {
    blob,
    Canister,
    ic,
    Err,
    nat64,
    Ok,
    Opt,
    Principal,
    query,
    Record,
    Result,
    text,
    update,
    Variant,
    Vec,
    bool,
    nat,
    Tuple,
    None,
    Some,
    Void,
    nat8
} from 'azle/experimental';
import { testCandidType } from 'azle/type_tests/assert_type';



// Type for the Credential record
type Credential = {
    student: Principal;
    institution: Principal;
    degree: text;
    issueDate: bigint;  // nat64 is represented as bigint in TypeScript
};

// Type for the credentials map
type CredentialsMap = Map<bigint, Credential>;

// Type for the credentialIdCounter
type CredentialIdCounter = bigint;  // nat64 is represented as bigint in TypeScript

// Type for the authorizedInstitutions set
type AuthorizedInstitutions = StableBTreeMap<text, Principal>;

// Type for the message constant
type Message = string;  // text is represented as string in TypeScript



const Credential = Record({
    student: Principal,
    institution: Principal,
    degree: text,
    issueDate: nat64
  });

const CredentialRequest = Record({
    credential_subject_did: text,
    credential_spec: Record({
        credential_type: text,
        arguments: Record({})
    })
});

const CredentialData = Record({
    credential_jwt: text,
    expiration_timestamp_ms: nat64
});


// Storage
const credentials = new StableBTreeMap<nat64, Credential>(0);
let credentialIdCounter: CredentialIdCounter = 1n;
const authorizedInstitutions: AuthorizedInstitutions = new StableBTreeMap<text, Principal>(1);
let preparedCredentials = new StableBTreeMap<text, { credential_jwt: string; expiration_timestamp_ms: bigint }>(3);
let owner: Principal | null = null;


// Set Owner (only callable once)
export const setOwner = async (): Promise<text> => {
    if (owner !== null) {
        throw new Error("Owner already set");
    }
    owner = ic.caller();
    return "Owner set successfully";
};

export const getOwner = async (): Promise<Principal> => {
    if (owner === null) {
        throw new Error("Owner not set");
    }
    return owner;
};


export const setStudent = async (student: Principal): Promise<text> => {
    if (student === null) {
        throw new Error("Student not set");
    }
    student = ic.caller();
    return "Student set successfully";
};


//1. Query: Consent message before issuing a credential
const vc_consent_message = (): text => {
    return "I hereby consent to issue a verifiable academic credential.";
};

// 2. Query: Derivation origin (canister ID)
export const derivation_origin = (): text => {
    // Returns the canister's URL for principal derivation in the VC flow
    return `https://${ic.id().toText()}.icp0.io`;

};

// 3. Update: Prepare credential (stub)
// export const prepare_credential = async (request: text): Promise<text> => {
//     try {
//         const parsedRequest: typeof CredentialRequest = JSON.parse(request);
//         const { credential_subject_did, credential_spec } = parsedRequest;

//         if (!credential_subject_did || !credential_spec || !credential_spec.credential_type) {
//             throw new Error('Invalid credential request: missing required fields');
//         }

//         const credentialJwt = `jwt.${credential_subject_did}.${credential_spec.credential_type}`;
//         const expirationTimestampMs = BigInt(Date.now()) + 24n * 60n * 60n * 1000n; // 24 hours

//         const credentialData = {
//             credential_jwt: credentialJwt,
//             expiration_timestamp_ms: expirationTimestampMs
//         };

//         preparedCredentials.insert(credential_subject_did.toString(), credentialData);
        
//         // Create a hash of the credential data (first 32 bytes)
//         const dataHash = Buffer.from(credential_subject_did.toString()).slice(0, 31); // Ensure it's less than 32 bytes
//         ic.setCertifiedData(dataHash);

//         return credential_subject_did.toString(); // Context for get_credential
//     } catch (error: any) {
//         return `Error: ${error.message}`;
//     }    
// };


// 4. Update: Return a JWT credential (stub)
// export const get_credential = async (context: text): Promise<text> => {
//     // Retrieves the prepared credential JWT using the context (credential_subject_did)
//     const caller_context = context.replace(/[()"]/g, '');
//     const credentialDataOpt: any = preparedCredentials.get(caller_context);
//     if (credentialDataOpt.Some) {
//         return credentialDataOpt.Some.credential_jwt;
//     } else {
//         return "Error: No prepared credential found for this context";
//     }
// };



export const prepare_credential = async (request: text): Promise<text> => {
    try {
        const parsedRequest: typeof CredentialRequest = JSON.parse(request);
        const { credential_subject_did, credential_spec } = parsedRequest;

        if (!credential_subject_did || !credential_spec || !credential_spec.credential_type) {
            throw new Error('Invalid credential request: missing required fields');
        }

        const credentialJwt = `jwt.${credential_subject_did}.${credential_spec.credential_type}`;
        const expirationTimestampMs = BigInt(Date.now()) + 24n * 60n * 60n * 1000n; // 24 hours

        const credentialData = {
            credential_jwt: credentialJwt,
            expiration_timestamp_ms: expirationTimestampMs
        };

        // Store with the exact key
        const key = credential_subject_did;
        console.log("Storing credential with key:", key);
        console.log("Storing credential data:", credentialData);

        preparedCredentials.insert(key, credentialData);
        
        // Create a hash of the credential data
        const dataHash = Buffer.from(key).slice(0, 31);
        ic.setCertifiedData(dataHash);

        return key;
    } catch (error: any) {
        console.error("Error in prepare_credential:", error);
        return `Error: ${error.message}`;
    }    
};

export const get_credential = async (context: text): Promise<text> => {
    // Log the incoming context
    console.log("Original context:", context);
    
    // Use the context directly without cleaning
    const key = context;
    console.log("Using key:", key);
    
    const credentialDataOpt: any = preparedCredentials.get(key);
    console.log("Found credential data:", credentialDataOpt);
    
    // Check if the result is not null (which means it exists)
    if (credentialDataOpt !== null) {
        return credentialDataOpt.credential_jwt;
    } else {
        return "Error: No prepared credential found for this context";
    }
};


// 5. Update: Issue a new on‑chain credential
export const issueCredential = async ({ student, institution, degree, issueDate }: Credential): Promise<nat64> => {

    // Issues a credential if the caller (institution) is authorized
    const institution_caller = ic.caller().toText();
    if (!authorizedInstitutions.get(institution_caller)) {
        throw new Error("Institution is not authorized");
    }
    const id = credentialIdCounter;
    credentialIdCounter += 1n;
    const credential: Credential = {
        student,
        institution,
        degree,
        issueDate
    };
    credentials.insert(id, credential);
    return id;
};


// 7. Update: Authorize an institution to issue creds
export const authorizeInstitution = async (institution: Principal): Promise<text> => {
   
    // Authorizes an institution, restricted to the canister owner
    if (owner === null) {
        throw new Error("Owner not set");
    }
    if (ic.caller().toText() !== owner.toText()) {
        throw new Error("Only the owner can authorize institutions");
    }
    authorizedInstitutions.insert(institution.toText(), institution);
    return `Institution authorized successfully`;
};



// Additional Functions
export const getCredential = async (id: nat64): Promise<Opt<Credential>> => {
    // Retrieves a credential by its ID
    const result = credentials.get(id);
    return result === null ? None : Some(result);
};

export const getCredentialsForStudent = async (student: Principal): Promise<Vec<Credential>> => {
    // Retrieves all credentials for a student
    const result: Credential[] = [];
    for (let i = 1n; i < credentialIdCounter; i++) {
        const credOpt: any = credentials.get(i);
        if (credOpt && credOpt.student.toText() === student.toText()) {
            result.push(credOpt);
        }
    }
    return result;
};

export const isInstitutionAuthorized = async (institution: Principal): Promise<bool> => {
    // Convert the institution principal to text for lookup
    const institutionText = institution.toText();
    // Check if the institution exists in the map
    const result = authorizedInstitutions.get(institutionText);
    return result !== null;
};



export default Canister ({
    // Testing funtions
    setOwner: update([], text, (setOwner)), // (Tested)
    setStudent: update([Principal], text, (setStudent)), //(Tested)
    getOwner: query([], Principal, (getOwner)), //(Tested)
    // Real needed funtions
    vc_consent_message: query([], text, (vc_consent_message)), //(Tested)
    derivation_origin: query([], text, (derivation_origin)), //(Tested)
    prepare_credential: update([text], text, (prepare_credential)),
    get_credential: update([text], text, (get_credential)),
    issueCredential: update([Credential], nat64, (issueCredential)), //(Tested)
    authorizeInstitution: update([Principal], text, (authorizeInstitution)), //(Tested)
    getCredential: query([nat64], Opt(Credential), (getCredential)),
    getCredentialsForStudent: query([Principal], Vec(Credential), (getCredentialsForStudent)),
    isInstitutionAuthorized: query([Principal], bool, (isInstitutionAuthorized)) //(Tested)
})

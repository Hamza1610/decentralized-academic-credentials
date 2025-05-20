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
    StableBTreeMap,
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
type AuthorizedInstitutions = Set<Principal>;

// Type for the message constant
type Message = string;  // text is represented as string in TypeScript



const Credential = Record({
    student: Principal,
    institution: Principal,
    degree: text,
    issueDate: nat64
  });

const credentials = StableBTreeMap<nat64, Credential>(0);
let credentialIdCounter: CredentialIdCounter = 1n;
const authorizedInstitutions: AuthorizedInstitutions = new Set<Principal>();


//1. Query: Consent message before issuing a credential
const vc_consent_message = (): text => {
    return "I hereby consent to issue a verifiable academic credential.";
};

// 2. Query: Derivation origin (canister ID)
export const derivation_origin = (): text => {
    return ic.caller().toText();
};

// 3. Update: Prepare credential (stub)
export const prepare_credential = async (request: text): Promise<text> => {
    return `Prepared credential for request: ${request}`;
};

// 4. Update: Return a dummy JWT credential (stub)
export const get_credential = async (context: text): Promise<text> => {
    return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...";
};

// 5. Update: Issue a new on‑chain credential
export const issueCredential = async ({ student, institution, degree, issueDate }: Credential): Promise<nat64> => {

    // (In real logic you’d check `ic.caller()` vs. an allowlist)

    const id = credentialIdCounter;
    credentialIdCounter +=1n;
    credentials.insert(id, {
        student,
        institution,
        degree,
        issueDate
    });

    return id;
};


// 7. Update: Authorize an institution to issue creds
export const authorizeInstitution = async (institution: Principal): Promise<text> => {
   
    // (In real logic, only the canister controller would be allowed)
    authorizedInstitutions.add(institution);
    return "Authorization of Institution successful!";
};


export default Canister ({
    vc_consent_message: query([], text, (vc_consent_message)),
    derivation_origin: query([], text, (derivation_origin)),
    prepare_credential: update([text], text, (prepare_credential)),
    get_credential: update([text], text, (get_credential)),
    issueCredential: update([Credential], nat64, (issueCredential)),
    authorizeInstitution: update([Principal], text, (authorizeInstitution))    
})

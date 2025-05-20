# Backend: Decentralized Academic Credentials Canister

## Overview
The backend of the Decentralized Academic Credentials platform is a canister (smart contract) built using Azle, a TypeScript CDK for the Internet Computer Protocol (ICP). It handles credential issuance, storage, and verification, implementing ICP's verifiable credentials (VC) standard for secure and tamper-proof academic credentials.

### Features
- **Credential Issuance**: Authorized institutions can issue credentials using the `issueCredential` method.
- **Credential Storage**: Credentials are stored on-chain using `StableBTreeMap` for persistence.
- **Credential Retrieval**: The `getCredential` method allows retrieval of credential details.
- **VC Issuer API**: Implements methods like `vc_consent_message`, `derivation_origin`, `prepare_credential`, and `get_credential` for VC compliance.
- **Authorization**: Only authorized institutions can issue credentials, managed via the `authorizeInstitution` method.

### Data Structures
- **Credential**: Stores student principal, institution principal, degree, and issue date.
  ```typescript
  type Credential = {
    student: Principal;
    institution: Principal;
    degree: text;
    issueDate: nat64;
  };
  ```
- **StableBTreeMap**: Used for persistent storage of credentials, authorized institutions, and the next credential ID.

### Canister Methods
Below is a detailed description of each method in the canister:

| **Method**               | **Type** | **Parameters**                        | **Return Type** | **Description**                                                                 |
|--------------------------|----------|---------------------------------------|-----------------|---------------------------------------------------------------------------------|
| `vc_consent_message`     | Query    | None                                  | `text`          | Returns a consent message for user approval before issuing a credential.         |
| `derivation_origin`      | Query    | None                                  | `text`          | Provides the canister’s URL for principal derivation.                            |
| `prepare_credential`     | Update   | `request: text`                       | `text`          | Prepares the credential for issuance and updates certified data.                 |
| `get_credential`         | Update   | `context: text`                       | `text`          | Issues the signed credential in JWT format.                                      |
| `issueCredential`        | Update   | `institution: Principal`, `student: Principal`, `degree: text`, `issueDate: nat64` | `nat64` | Issues a new credential and returns its ID. Only callable by authorized institutions. |
| `getCredential`          | Query    | `id: nat64`                           | `?Credential`   | Retrieves a credential by its ID.                                                |
| `authorizeInstitution`   | Update   | `institution: Principal`              | `Void`          | Authorizes an institution to issue credentials. Only callable by the canister owner. |

### Role-Based Integration
The canister enforces role-based access control:
- **Institutions**:
  - **Role**: Issuers of przedmioty credentials.
  - **Permissions**: Can call `issueCredential` after being authorized.
  - **Implementation**: The canister checks if the caller's principal is in `authorizedInstitutions` before allowing credential issuance.
- **Students**:
  - **Role**: Recipients of credentials.
  - **Permissions**: Can view their credentials using `getCredential`.
  - **Implementation**: No special permissions needed; credentials are publicly queryable by ID.
- **Verifiers**:
  - **Role**: Third parties verifying credentials.
  - **Permissions**: Can use `get_credential` to retrieve and verify the JWT.
  - **Implementation**: Public method, no authentication required for verification.

This ensures that only trusted entities can issue credentials, while maintaining open access for verification, aligning with the decentralized nature of the platform.

### Setup and Deployment
1. **Navigate to the Backend Directory**:
   ```bash
   cd backend
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Start Local Replica**:
   ```bash
   dfx start --background
   ```

4. **Deploy the Canister**:
   ```bash
   dfx deploy
   ```

5. **Interact with the Canister**:
   - Use DFX to call methods:
     ```bash
     dfx canister call academic-credentials issueCredential '(principal "aaaaa-...", principal "bbbbb-...", "Bachelor of Science", 1640995200000)'
     ```

### Security Measures
- **Authorization Checks**: Ensures only authorized institutions can issue credentials.
- **Principal Validation**: Uses Internet Identity principals to identify users.
- **Immutable Storage**: Credentials are stored on-chain, preventing tampering.

### Practical Usage
- **Issuing Credentials**: Institutions use the frontend or directly call `issueCredential` with the required parameters.
- **Viewing Credentials**: Students query `getCredential` with their credential ID.
- **Verifying Credentials**: Verifiers use the VC issuer API to retrieve and verify the JWT.

### Troubleshooting
- **Unauthorized Errors**: Ensure the institution is authorized by checking `authorizedInstitutions`.
- **Storage Issues**: Verify that `StableBTreeMap` is correctly initialized and used.
- **VC API Compliance**: Ensure all VC issuer methods are implemented as per the [ICP VC Specification](https://github.com/dfinity/internet-identity/blob/main/docs/vc-spec.md).
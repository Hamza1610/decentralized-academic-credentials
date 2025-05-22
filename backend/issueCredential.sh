#!/bin/bash

# 1. First, get your principal ID
PRINCIPAL=$(dfx identity get-principal)
echo "Your principal ID: $PRINCIPAL"

# 2. First, let's prepare a credential to test get_credential
echo "Preparing a credential..."
# Properly escape the JSON string for Candid
PREPARE_REQUEST='{\"credential_subject_did\":\"did.example.123\",\"credential_spec\":{\"credential_type\":\"AcademicCredential\",\"arguments\":{}}}'
CONTEXT=$(dfx canister call backend prepare_credential "(\"$PREPARE_REQUEST\")")
echo "Prepared credential context: $CONTEXT"

# 3. Test get_credential with the context
echo "Testing get_credential..."
dfx canister call backend get_credential "($CONTEXT)"

# 4. Issue a credential to test getCredential and getCredentialsForStudent
echo "Issuing a credential..."
CREDENTIAL_ID=$(dfx canister call backend issueCredential "(record {
    student = principal \"$PRINCIPAL\";
    institution = principal \"$PRINCIPAL\";
    degree = \"Bachelor of Science\";
    issueDate = 1640995200000 : nat64
})")
echo "Issued credential ID: $CREDENTIAL_ID"

# 5. Test getCredential with the issued credential ID
echo "Testing getCredential..."
dfx canister call backend getCredential "($CREDENTIAL_ID)"

# 6. Test getCredentialsForStudent with your principal
echo "Testing getCredentialsForStudent..."
dfx canister call backend getCredentialsForStudent "(principal \"$PRINCIPAL\")"
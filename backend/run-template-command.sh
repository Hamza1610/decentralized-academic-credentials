dfx start --clean --background
dfx deploy
principal=$(dfx identity get-principal)
dfx canister call backend setOwner "(principal \"$principal\")"
dfx canister call backend authorizeInstitution "(principal \"$principal\")"
dfx canister call backend setStudent "(principal \"$principal\")"
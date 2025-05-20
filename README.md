# Decentralized Academic Credentials

## Overview
The **Decentralized Academic Credentials** platform is a blockchain-based solution built on the Internet Computer Protocol (ICP) to address the issue of credential fraud. Educational institutions can issue tamper-proof, verifiable academic credentials that students can securely store and share with employers or other institutions. This project leverages ICP's verifiable credentials (VC) standard and Internet Identity for secure authentication, ensuring trust and transparency in academic qualifications.

### Features
- **Credential Issuance**: Authorized educational institutions can issue academic credentials as verifiable credentials (VCs) in JWT format.
- **On-Chain Storage**: Credentials are stored immutably on the ICP blockchain for security and transparency.
- **Student Access**: Students can view and share their credentials with third parties.
- **Verification**: Employers or institutions can verify the authenticity of credentials directly on-chain.
- **Role-Based Access**: Secure access control ensures only authorized institutions can issue credentials, while students and verifiers have appropriate permissions.

### Technology Stack
- **Backend**: Azle (TypeScript CDK for ICP), ICP Canisters
- **Frontend**: React, Internet Identity SDK
- **Authentication**: ICP Internet Identity
- **Storage**: StableBTreeMap for persistent on-chain data

### Getting Started
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-repo/decentralized-academic-credentials.git
   cd decentralized-academic-credentials
   ```

2. **Set Up the Backend**:
   - Follow the instructions in [backend/README.md](#backend-readmemd).

3. **Set Up the Frontend**:
   - Follow the instructions in [frontend/README.md](#frontend-readmemd).

4. **Run the Application**:
   - Start the local ICP replica and deploy the canister.
   - Launch the React frontend to interact with the dApp.

### Role-Based Integration
The platform implements role-based access control to ensure secure and appropriate interactions:
- **Institutions**: Can issue credentials after being authorized by the canister owner.
- **Students**: Can view and share their credentials.
- **Verifiers**: Can verify the authenticity of credentials without needing special permissions.

This is enforced through:
- **Authorization Checks**: Only authorized institutions can call the `issueCredential` method.
- **Principal-Based Access**: Internet Identity provides secure authentication, and principals are used to identify users and their roles.

### Contributing
We welcome contributions! Please follow these steps:
1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Submit a pull request with a clear description of your changes.

### License
This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.
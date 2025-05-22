export const idlFactory = ({ IDL }) => {
  return IDL.Service({
    'authorizeInstitution' : IDL.Func([IDL.Principal], [IDL.Text], []),
    'derivation_origin' : IDL.Func([], [IDL.Text], ['query']),
    'getCredential' : IDL.Func(
        [IDL.Nat64],
        [
          IDL.Opt(
            IDL.Record({
              'issueDate' : IDL.Nat64,
              'institution' : IDL.Principal,
              'degree' : IDL.Text,
              'student' : IDL.Principal,
            })
          ),
        ],
        ['query'],
      ),
    'getCredentialsForStudent' : IDL.Func(
        [IDL.Principal],
        [
          IDL.Vec(
            IDL.Record({
              'issueDate' : IDL.Nat64,
              'institution' : IDL.Principal,
              'degree' : IDL.Text,
              'student' : IDL.Principal,
            })
          ),
        ],
        ['query'],
      ),
    'getOwner' : IDL.Func([], [IDL.Principal], ['query']),
    'get_credential' : IDL.Func([IDL.Text], [IDL.Text], []),
    'isInstitutionAuthorized' : IDL.Func(
        [IDL.Principal],
        [IDL.Bool],
        ['query'],
      ),
    'issueCredential' : IDL.Func(
        [
          IDL.Record({
            'issueDate' : IDL.Nat64,
            'institution' : IDL.Principal,
            'degree' : IDL.Text,
            'student' : IDL.Principal,
          }),
        ],
        [IDL.Nat64],
        [],
      ),
    'prepare_credential' : IDL.Func([IDL.Text], [IDL.Text], []),
    'setOwner' : IDL.Func([], [IDL.Text], []),
    'setStudent' : IDL.Func([IDL.Principal], [IDL.Text], []),
    'vc_consent_message' : IDL.Func([], [IDL.Text], ['query']),
  });
};
export const init = ({ IDL }) => { return []; };

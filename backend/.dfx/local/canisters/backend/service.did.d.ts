import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface _SERVICE {
  'authorizeInstitution' : ActorMethod<[Principal], string>,
  'derivation_origin' : ActorMethod<[], string>,
  'getCredential' : ActorMethod<
    [bigint],
    [] | [
      {
        'issueDate' : bigint,
        'institution' : Principal,
        'degree' : string,
        'student' : Principal,
      }
    ]
  >,
  'getCredentialsForStudent' : ActorMethod<
    [Principal],
    Array<
      {
        'issueDate' : bigint,
        'institution' : Principal,
        'degree' : string,
        'student' : Principal,
      }
    >
  >,
  'getOwner' : ActorMethod<[], Principal>,
  'get_credential' : ActorMethod<[string], string>,
  'isInstitutionAuthorized' : ActorMethod<[Principal], boolean>,
  'issueCredential' : ActorMethod<
    [
      {
        'issueDate' : bigint,
        'institution' : Principal,
        'degree' : string,
        'student' : Principal,
      },
    ],
    bigint
  >,
  'prepare_credential' : ActorMethod<[string], string>,
  'setOwner' : ActorMethod<[], string>,
  'setStudent' : ActorMethod<[Principal], string>,
  'vc_consent_message' : ActorMethod<[], string>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];

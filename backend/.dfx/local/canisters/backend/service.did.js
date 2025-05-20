export const idlFactory = ({ IDL }) => {
  return IDL.Service({ 'getMessage' : IDL.Func([], [IDL.Text], ['query']) });
};
export const init = ({ IDL }) => { return []; };

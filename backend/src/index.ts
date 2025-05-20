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

const message = "Hello, world!";

const getMessage = (): text => {
    return message;
}

const fetchMyName = (): text => {
    return "Hamza your are becoming ICP developer!"
}

export default Canister ({
    getMessage: query([], text, (getMessage)),
    testFunction: query([], text, (fetchMyName))
})

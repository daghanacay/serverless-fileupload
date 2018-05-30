exports.handler = (event, context, callback) => {
    callback(null, callback(null, {
        'data': `hello to the user '${event.userId}' at stage '${event.stage}'`
    }));
};
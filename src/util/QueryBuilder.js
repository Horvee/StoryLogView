
const empty_request_url = {
    query: {
        bool: {
            must: [],
            should: [],
        },
    },
    sort: {

    }
};


import _ from 'lodash';
export default {
    build: (param) => {
        let reqBody = {};
        reqBody = _.cloneDeep(empty_request_url);

        if (_.isEmpty(param)) {
            return reqBody;    
        }

        reqBody.sort.startTime = { "order": "desc" };

        if(!_.isNil(param.storyLogId) && param.storyLogId != '') {
            reqBody.query.bool.must.push({
                match: {
                    storyCode: param.storyLogId,
                },
            })
        }
        
        if(!_.isNil(param.useTime) && param.useTime > 0) {
            reqBody.query.bool.must.push({
                match: {
                    useTime: param.useTime,
                },
            })
        }
        
        if (!_.isNil(param.startTime)) {
            reqBody.query.bool.must.push({
                range: {
                    startTime: {
                        gte : param.startTime
                    }
                },
            });
        }
        
        if (!_.isNil(param.endTime)) {
            reqBody.query.bool.must.push({
                range: {
                    endTime: {
                        lte: param.endTime,
                    },
                }
            });
        }

        if(!_.isNil(param.tagNumber) && param.tagNumber > 0) {
            reqBody.query.bool.must.push({
                match: {
                    storyCode: param.tagNumber,
                },
            })
        }
        
        if(!_.isNil(param.tagName) && param.tagName != '') {
            reqBody.query.bool.must.push({
                match: {
                    storyTitle: param.tagName,
                },
            })
        }
        
        // if(!_.isNil(param.messages) && param.messages.length > 0) {
        //     for (let item of param.messages) {
        //         reqBody.query.bool.must.push({
        //             match: {
        //                 'logContent.logInfoList.message': item,
        //             },
        //         })
        //     }
        // }
        
        if(!_.isNil(param.messages) && param.messages.length > 0) {
            for (let item of param.messages) {
                reqBody.query.bool.must.push({
                    match_phrase: {
                        'logContent.logInfoList.message': item,
                    },
                })
            }
        }

        return reqBody;
    }
}

/**
    {
        query: {
            bool: {
                must: [
                    {
                        range: {
                            startTime: {
                                gte: 1637316802633,
                            },
                        },
                    },
                    {
                        range: {
                            endTime: {
                                lte: 1637316802635,
                            },
                        },
                    },
                    {
                        match: {
                            storyCode: "100000",
                        },
                    },
                ],
                should: [
                    {
                        match: {
                            "logContent.logInfoList.message": "haha",
                        },
                    },
                    {
                        match: {
                            "logContent.logInfoList.message": "11-19",
                        },
                    },
                ],
            },
        },
    };
    
*/


const empty_request_url = {
    query: {
        bool: {
            must: [],
            should: [],
        },
    },
};


import _ from 'lodash';
export default {
    build: (param) => {
        let reqBody = {};
        reqBody = _.cloneDeep(empty_request_url);

        if (_.isEmpty(param)) {
            return reqBody;    
        }

        if(!_.isNil(param.storyLogId)) {
            reqBody.query.bool.must.push({
                match: {
                    storyCode: param.storyLogId,
                },
            })
        }
        
        if(!_.isNil(param.useTime)) {
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

        if(!_.isNil(param.tagName)) {
            reqBody.query.bool.must.push({
                match: {
                    storyTitle: param.tagName,
                },
            })
        }
        
        if(!_.isNil(param.message)) {
            reqBody.query.bool.should.push({
                match: {
                    'logContent.logInfoList.message': param.message,
                },
            })
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

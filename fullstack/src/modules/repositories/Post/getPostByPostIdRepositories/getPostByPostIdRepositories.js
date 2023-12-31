const { 
    client,
} = require('../../../common/handlers');



const getPostByPostIdRepositories = async ({
    post_id
} = {}) => {

    const response = await client('posts').where({ id: post_id })

    const has_response = Array.isArray(response) && response.length > 0;

    if(!has_response){
        return {
            posts: []
        }
    }

    return {
        posts: response
    }

}

module.exports = {
    getPostByPostIdRepositories
}
const RequestPromise = require('request-promise'),
Cheerio = require('cheerio')

const gfg = ({GFGid}) =>{
    const uri = `https://auth.geeksforgeeks.org/user/${GFGid}/practice/`

    let options = {
        uri,
        transform: function(body) {
            return Cheerio.load(body)
        }
    }

    return RequestPromise(options).then($ => {
        let topics = []
        $('.page-content .mdl-cell').each(function(i, elem) {
            let topic = {
                title: $(this)
                    .find('a').text().trim(),
                link: $(this)
                    .find('a').attr('href'),
            }
            topics.push(topic)
        })

        return topics;
    })

}

module.exports = {
    gfg
}
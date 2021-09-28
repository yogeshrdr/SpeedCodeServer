const request = require("request-promise");
const cheerio = require("cheerio");


exports.getquestions = async ({id}) => {
    
        const result = await request.get(`https://www.spoj.com${id}`);
        const $ = cheerio.load(result);

        const questions = [];

        $("#content > div.row > div.col-lg-8.col-md-8 > table > tbody > tr").each((index, element) => {
            if (index === 0) 
                return true;

            const question = $(element).find("td");

            const id = parseInt($(question[0]).text());
            const questionTitle = $(question[1]).find("a").text().trim();
            const Link = $(question[1]).find("a").attr('href');
            const questionLink = `https://www.spoj.com${Link}`;
            const MainTitle = $(question[1]).find("a").attr('href');
            const questionMainTitle = MainTitle.substr(10, MainTitle.length);
            const done = false;

            const tempquestion = {id, questionTitle, questionLink, questionMainTitle, done};
            questions.push(tempquestion);
        })
        return questions;
}

exports.getContent = async () =>{
    
        const result = await request.get(`https://www.spoj.com/problems/tags`);
        const $ = cheerio.load(result);

        const contents = [];

        $("#content > div.row > div > table > tbody > tr").each((index, element) => {
            if (index === 0) 
                return true;

            const content= $(element).find("td");

            const contentName = $(content[0]).find("a").text().trim();
            const contentLink = $(content[0]).find("a").attr('href');
            const contentProblemCount = parseInt($(content[1]).text());
            const tempcontent = {contentName, contentLink, contentProblemCount };
            if(contentProblemCount >0)
            {
                contents.push(tempcontent);
            }
        })

        return contents;
}



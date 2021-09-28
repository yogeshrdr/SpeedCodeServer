const request = require("request-promise");
const cheerio = require("cheerio");


exports.getquestions = async ({id}) => {
    
        const result = await request.get(`https://a2oj.com/Ladder${id}.html`);
        const $ = cheerio.load(result);

        const questions = [];

        $("body > center > table:nth-child(3) > tbody > tr").each((index, element) => {
            if (index === 0) 
                return true;

            const question = $(element).find("td");

            const id = parseInt($(question[0]).text());
            const questionTitle = $(question[1]).find("a").text().trim();
            const questionLink = $(question[1]).find("a").attr('href');
            const questionDifficulty = parseInt($(question[3]).text());
            const done = false;

            const tempquestion = {id, questionTitle, questionLink, questionDifficulty, done};
            questions.push(tempquestion);
        })
        return questions;

}

exports.getContent = async () =>{
    
        const result = await request.get(`https://a2oj.com/Ladders.html`);
        const $ = cheerio.load(result);

        const contents = [];

        $("body > center > table:nth-child(7) > tbody > tr").each((index, element) => {
            if (index === 0) 
                return true;

            const content= $(element).find("td");

            const id = parseInt($(content[0]).text());
            const contentName = $(content[1]).find("a").text().trim();
            const contentLink = $(content[1]).find("a").attr('href');
            const contentProblemCount = parseInt($(content[2]).text());
            const tempcontent = {id,  contentName, contentLink, contentProblemCount };
            contents.push(tempcontent);
        })

        $("body > center > table:nth-child(4) > tbody > tr").each((index, element) => {
            if (index === 0) 
                return true;

            const content= $(element).find("td");

            const id = parseInt($(content[0]).text());
            const contentName = $(content[1]).find("a").text().trim();
            const contentLink = $(content[1]).find("a").attr('href');
            const contentProblemCount = parseInt($(content[2]).text());
            const tempcontent = {id,  contentName, contentLink, contentProblemCount };
            contents.push(tempcontent);
        })

        return contents;
}



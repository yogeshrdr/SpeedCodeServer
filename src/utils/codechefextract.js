const request = require("request-promise");
const cheerio = require("cheerio");


exports.getquestions = async ({id}) => {
    
        const result = await request.get(`https://www.codechef.com/problems/${id}/`);
        const $ = cheerio.load(result);

        const questions = [];

        $("#primary-content > div > div.content-spacer > div > div:nth-child(3) > table > tbody > tr").each((index, element) => {
            if (index === 0) 
                return true;

            const question = $(element).find("td");

            const questionTitle = $(question[0]).find("a").text().trim();
            const Link = $(question[0]).find("a").attr('href');
            const questionLink = `https://www.codechef.com${Link}`;
            const questionCode = $(question[1]).find("a").text().trim();
            const done = false;

            const tempquestion = {questionTitle, questionLink, questionCode, done};
            questions.push(tempquestion);
        })
        return questions;

}

exports.getContent = async () =>{
    
        const contents = ["school", "easy" , "medium" , "hard" , "challenge" , "extcontest"];

        return contents;
}



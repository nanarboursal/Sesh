import React, { useState, useEffect } from 'react';
import { RadialChart } from 'react-vis';

function BrowserHistory2() {
    const [categories, setCategories] = useState([]);
    const [myData, setMyData] = useState([]);
    var url = "https://api.openai.com/v1/engines/text-davinci-003/completions";
    var bearer = 'Bearer ' + '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'
    


    const fetchData = async (website) => {
        console.log("about to fetch data")
        try {
            const data = await fetch(url, {
                method: 'POST',
                headers: {
                    'Authorization': bearer,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "prompt": "Which of the following categories is " + website + " in: Entertainment, Education, Search, Sports, News, Health, Children, Game, Tech, Arts, Celebrity, Social Media, Productivity, or Other?\n A: ",
                    "max_tokens": 100,
                    "temperature": 0,
                    "top_p": 1,
                    "frequency_penalty": 0,
                    "presence_penalty": 0,
                    "stop": ["\n"]
                })
            });
            const result = await data.json();
            // console.log("we are in data", data);
            // console.log("ello??",data['choices'][0].text);
            return result['choices'][0].text.trim();
        }

        catch {
            console.error();
            return null;
        }
    }
    useEffect(() => {
        const websiteList = ["https://platform.openai.com/account/usage",
        "https://calendar.google.com/calendar/u/0/r/week",
        "https://twitter.com/AviSchiffmann",
        "https://github.com/nanarboursal/Sesh"]
       

        const fetchCategories = async () => {
            const historyCat = [];
            const websiteDictionary = {
                'Tech': 0,
                'Productivity': 0,
                'SocialMedia': 0,
            };
           
            for (let i = 0; i < websiteList.length; i++) {
               
                const category = await fetchData(websiteList[i])
                historyCat.push(category)
                if (category === "Productivity") {
                    websiteDictionary.Productivity++
                    console.log("here here", websiteDictionary.Productivity)
                }
                if (category === "Social Media") {
                    websiteDictionary.SocialMedia++
                    console.log("here here 2", websiteDictionary.SocialMedia)
                }
                if (category === "Tech") {
                    websiteDictionary.Tech++
                    console.log("here here 3", websiteDictionary.SocialMedia)
                }
        
            }
            setCategories(historyCat);
            setMyData([{angle: websiteDictionary.Productivity,label: 'Productivity'}, {angle:websiteDictionary.SocialMedia,label: 'Social Media'}, {angle:websiteDictionary.Tech,label: 'Tech'}]);

        };
        fetchCategories();
        
       
    }, [])
  
    console.log('mah data',myData)

    return (
        <div>
            <div>Browser History Page</div>
            <RadialChart
                data={myData}
                width={300}
                height={300} />
        </div>
    );
}


export default BrowserHistory2;
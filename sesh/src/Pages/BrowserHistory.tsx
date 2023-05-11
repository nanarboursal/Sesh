
import React, { useEffect, useState } from 'react';
// import { Chart } from "react-google-charts";
// import { Configuration, OpenAIApi } from "openai";
import { RadialChart } from 'react-vis';
import "./browserhistory.css";

// let websiteCategory = new Array();
// let websiteCategoryCount = new Array();
// let websiteCategory: string[] =[];
// let websiteCategoryCount: number[]=[0,0,0];
let websiteDictionaryObj = new Object();
let websiteDictionary ={
    'Tech':0,
    'Productivity':0,
    'SocialMedia':0,
};
var historyCat = new Array();
let websiteList = ["https://platform.openai.com/account/usage",
            "https://calendar.google.com/calendar/u/0/r/week",
            "https://twitter.com/AviSchiffmann",
            "https://github.com/nanarboursal/Sesh"]
function BrowserHistory() {
  const [recommendation, setRecommendation] = useState("");
    //   const { Configuration, OpenAIApi } = require("openai");

    // const configuration = new Configuration({
    // 	apiKey: '',
    // });
    // const openai = new OpenAIApi(configuration);
    // const [websiteCategory, setWebsiteCategory] = useState<string[]>([]);;
    // const [websiteCategoryCount, setWebsiteCategoryCount] = useState<number[]>([]);;
    useEffect(() => {
        // OpenaiFetchAPI()
        console.log("start webDictionary ", websiteDictionary.Productivity)
        //   fetch('https://cytv6yoi4i.execute-api.us-east-2.amazonaws.com/default/surb') // 'data/data.json' in my case
        //   .then(response=>response.text())
        //   .then(data => {
        //     console.log(data)
        //     var outObj = JSON.parse(data);
        //     for (var i = 0; i < outObj.length; i++) {
        //       var jsonData = outObj[i];
        //       console.log(jsonData);
        //     }

        //   })
        // .catch(function(err) {
        //   console.log('Fetch Error');
        // console.log('catcount2', websiteCategoryCount[1])
        // });
        openrec()
    })

    const openrec = () =>{
      var url = "https://api.openai.com/v1/engines/davinci/completions";
      var bearer = 'Bearer ' + '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'
      var highestCount = "social media"
      fetch(url, {
       method: 'POST',
       headers: {
           'Authorization': bearer,
           'Content-Type': 'application/json'
       },
       body: JSON.stringify({
         "prompt": `How can I decrease my + ${highestCount} + website usage?`,
         "max_tokens": 100,
         "temperature": 0.7,
         'top_p': 1.0,
         'frequency_penalty': 0.0,
         'presence_penalty': 0.0
       })
  
    }
  ).then(response => {
      console.log("response2", response)
      return response.json()
  
  }).then(data=>{
    console.log("data is", data)
    console.log("------", data.choices[0].text)
    setRecommendation(data.choices[0].text)
  })
  .catch(error => {
      console.log('Something bad happened ' + error)
  });
    }

    const OpenaiFetchAPI = () => {
        console.log("Calling GPT3")
        
        
        var url = "https://api.openai.com/v1/engines/text-davinci-003/completions";
        var bearer = 'Bearer ' + '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'
        
        
        for (let i = 0; i < websiteList.length; i++) {
            // console.log(websiteList);
            fetch(url, {
                method: 'POST',
                headers: {
                    'Authorization': bearer,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "prompt": "Which of the following categories is " + websiteList[i] + " in: Entertainment, Education, Search, Sports, News, Health, Children, Game, Tech, Arts, Celebrity, Social Media, Productivity, or Other?\n A: ",
                    "max_tokens": 100,
                    "temperature": 0,
                    "top_p": 1,
                    "frequency_penalty": 0,
                    "presence_penalty": 0,
                    "stop": ["\n"]
                })          

            }).then(response => {

                return response.json()

            }).then(data => {
                // console.log(data)
                // console.log(typeof data)
                // console.log(Object.keys(data))
                // console.log(data['choices'][0].text)
                historyCat.push(data['choices'][0].text)
                console.log('web category', historyCat[i])

            })
                .catch(error => {
                    console.log('Something bad happened ' + error)
                });
                console.log('web category2 ', historyCat[2]);
        }
        console.log('web category 3', historyCat[1]);
        console.log('website list', websiteList);
        // console.log('webdict',websiteDictionary.Productivity )
        for (let i = 0; i < websiteList.length; i++){
            websiteDictionary.Productivity = websiteDictionary.Productivity +1
            // websiteDictionary.SocialMedia = websiteDictionary.SocialMedia +2
            // websiteDictionary.Tech = websiteDictionary.Tech +3
            if (historyCat[i]===' Productivity'){
                websiteDictionary.Productivity = websiteDictionary.Productivity +1
                console.log("here here", websiteDictionary.Productivity ) 
                // historyCatCount.push(2)
            }
            if (historyCat[i]===' Social Media'){
                websiteDictionary.SocialMedia = websiteDictionary.SocialMedia + 1
                console.log("here here 2", websiteDictionary.SocialMedia) 
                // historyCatCount.push(3)
            }
            if (historyCat[i]===' Tech'){
                // historyCatCount[2] =historyCat[0] +3
                websiteDictionary.Tech = websiteDictionary.Tech +1
                console.log("here here 3", websiteDictionary.SocialMedia) 
                // historyCatCount.push(4)
            }
        
        }

        // websiteCategory =historyCat;
        // websiteCategoryCount =historyCatCount;
        // setWebsiteCategory(historyCat);
        // setWebsiteCategoryCount(historyCatCount);
    }

    
    //    const dataObj = [
    //     ["Task", "Hours per Day"],
    //     ["Work", 11],
    //     ["Eat", 2],
    //     ["Commute", 2],
    //     ["Watch TV", 2],
    //     ["Sleep", 7],
    //   ];

    //   const options = {
    //     title: "My Daily Activities",
    //   };
    
    OpenaiFetchAPI();
    const prodNum = websiteDictionary['Productivity']
    console.log("first prod", prodNum)
    // websiteDictionary['Productivity'] =200
    const myData = [{angle: websiteDictionary.Productivity,label: 'Productivity'}, {angle:websiteDictionary.SocialMedia,label: 'Social Media'}, {angle:websiteDictionary.Tech,label: 'Tech'}]
    console.log("in the end webDictionary ", websiteDictionary)
    console.log("in the end prod", prodNum)
    console.log("in the end social media ", websiteDictionary.SocialMedia)
    
    // console.log('catcount1', websiteCategoryCount[1])
console.log('myData', myData)
console.log("in the end webDictionary one more time ", websiteDictionary)
    return (
        
        <div>
            <div>Browser History Page</div>
            <RadialChart
                data={myData}
                width={300}
                height={300} />
            <div className="wotd-block">
            <h1 className="wotd">Your Recommendations:</h1>
            <p className="wotd-def">{recommendation}</p>
              </div>  
        
        </div>

    );
}

export default BrowserHistory;

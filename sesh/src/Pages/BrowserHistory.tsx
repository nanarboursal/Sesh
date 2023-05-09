import React, { useEffect, useState } from 'react';
// import { Chart } from "react-google-charts";
//import { Configuration, OpenAIApi } from "openai";
import { RadialChart } from 'react-vis';

function BrowserHistory() {
  //   const { Configuration, OpenAIApi } = require("openai");

	// const configuration = new Configuration({
	// 	apiKey: '',
	// });
	// const openai = new OpenAIApi(configuration);
  const [countTech, setCountTech] = useState(0);
  const [countProd, setCountProd] = useState(0);  
  const [countSocMed, setCountSocMed] = useState(0);  
  useEffect(() => {
    OpenaiFetchAPI()
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
  // });
  //window.location.reload()
  console.log("countTech grgegegre", ct, cp, csm)
  let ct2 = 0
  let cp2 = 0
  let csm2 = 0
  for(let k = 0; k < answersArr.length; k++){
    
    if(answersArr[k] === ' Tech'){setCountProd(cp2++)}
    if(answersArr[k] === ' Productivity'){setCountTech(ct2++)}
    if(answersArr[k] === ' Social Media'){setCountSocMed(csm2++)}
  }
  console.log("countTech grgegegre", ct2, cp2, csm2)

  

  }, [countProd])

  interface openAIOutput {
    website: string,
    category: string
  }

  interface categoryCount {
    category: string,
    count: number
  }

  let answers: openAIOutput [] = [];
  let countArr: categoryCount [] = [];
  let answersArr = new Array()

  let websiteName = ""
  
  let ct = 0
  let cp = 0
  let csm = 0
  const OpenaiFetchAPI = () => {
    console.log("Calling GPT3")
    var url = "https://api.openai.com/v1/engines/text-davinci-003/completions";
    var bearer = 'Bearer ' + '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'
    let websiteList = ["https://platform.openai.com/account/usage",
    "https://calendar.google.com/calendar/u/0/r/week",
    "https://twitter.com/AviSchiffmann",
    "https://github.com/nanarboursal/Sesh"]

    let j = 0
    for(let i = 0; i < websiteList.length; i++){ 
      j = i
      console.log(websiteList[i])
      
    fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': bearer,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "prompt": "Which of the following categories is " + websiteList[i]+ " in: Entertainment, Education, Search, Sports, News, Health, Children, Game, Tech, Arts, Celebrity, Social Media, Productivity, or Other?\n A: ",
            "max_tokens": 100,
            "temperature": 0,
            "top_p": 1,
            "frequency_penalty":0,
            "presence_penalty":0,
            "stop":["\n"]
        })
      

    }).then(response => {
        console.log("response", response)
        return response.json()
       
    }).then(data=>{
        console.log(data)
        console.log("type:", typeof data)
        console.log(Object.keys(data))
        console.log("data['choices'][0].text", data['choices'][0].text)
        //const output: openAIOutput = {"website": websiteList[j], "category":data['choices'][0].text}
        var commentData: openAIOutput = {
        website : websiteList[i],
        category : data['choices'][0].text
        }
        answers.push(commentData)
        console.log("answers array = ", answers)
        answersArr.push(data['choices'][0].text)

        // console.log(answers.some(item => item["category"] === "Tech"))
        // console.log(answers.some(item => item["category"] === data['choices'][0].text))
     

        if(data['choices'][0].text=== ' Tech'){setCountTech(ct++)}
        if(data['choices'][0].text === ' Productivity'){setCountProd(cp++)}
        if(data['choices'][0].text === ' Social Media'){setCountSocMed(csm++)}
        // if (answers.some(function(item) {
        //   if(item["category"] === ' Tech'){return countTech++}
        //   // if(item["category"] === ' Productivity'){return countProd++}
        //   // if(item["category"] === ' Social Media'){return countSocMed++}
        // }))
        console.log("countTech----", ct, cp, csm)

        console.log("countTech", countTech, countProd, countSocMed)

        return
    })
        .catch(error => {
            console.log('Something bad happened ' + error)
        });
      }

      // out of for loop 

      
     // console.log("answers array = ", answers)
     url = "https://api.openai.com/v1/engines/davinci/completions";
     fetch(url, {
      method: 'POST',
      headers: {
          'Authorization': bearer,
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "prompt": "A user has been using Social Media websites 4 times a day and Tech websites 1 time a day. What are some suggestions for them?\n A: ",
          "max_tokens": 100,
          "temperature": 0,
          "top_p": 1,
          "frequency_penalty":0,
          "presence_penalty":0,
          "stop":["\n"]
      })
    

  }).then(response => {
      console.log("response2", response)
      return response.json()
     
  }).then(data=>{
    console.log("------",data)
  })
  .catch(error => {
      console.log('Something bad happened ' + error)
  });
} 


const myData = [{angle: countProd,label: 'Productivity'}, {angle:countSocMed,label: 'Social Media'}, {angle:countTech,label: 'Tech'}]
console.log('myData', myData)

    return (
      <div>
      <div>Browser History Page {countProd}</div>
      <RadialChart
          data={myData}
          width={300}
          height={300} />
          
  
  </div>

        
    );
}

export default BrowserHistory;
import React, { useEffect, useState } from 'react';
// import { Chart } from "react-google-charts";
//import { Configuration, OpenAIApi } from "openai";
import { RadialChart } from 'react-vis';
import "./browser.css";

function BrowserHistory() {
  //   const { Configuration, OpenAIApi } = require("openai");

	// const configuration = new Configuration({
	// 	apiKey: '',
	// });
	// const openai = new OpenAIApi(configuration);
  const [countTech, setCountTech] = useState(0);
  const [countProd, setCountProd] = useState(0);  
  const [countSocMed, setCountSocMed] = useState(0);  
  const [recommendation, setRecommendation] = useState("");

  useEffect(() => {
    
    openrec()
    // OpenaiFetchAPI()
    // .then((response)=>{
    //   console.log("countTech grgegegre", response)
    //   console.log("answersArr", answersArr)
    //   console.log("answersArr", answersArr[0])
    
     
    //   let ct2 = 0
    //   let cp2 = 0
    //   let csm2 = 0
    //   for(let k = 0; k < 4; k++){
    //     console.log("answersArr", answersArr[k])
    
    //     if(answersArr[k] === ' Tech'){cp2++}
    //     if(answersArr[k] === ' Productivity'){ct2++}
    //     if(answersArr[k] === ' Social Media'){csm2++}
    //   }
    //   console.log("countTech grgegegre", ct2, cp2, csm2)
    //   // setCountTech(ct)
    //   // setCountSocMed(csm)
    //   // setCountProd(cp)
    //   cp = cp2
    //   csm = csm2
    //   ct = ct2
    //   console.log("countTech aaaaa", ct, cp, csm)

    // })
     

     
    
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
  
  

  }, [])

  interface openAIOutput {
    website: string,
    category: string
  }

  interface categoryCount {
    category: string,
    count: number
  }

  interface chartType {
    angle: number,
    label: string
  }

  let answers: openAIOutput [] = [];
  let countArr: categoryCount [] = [];
  let answersArr : string[] = [];
  let valArr: Array<number> = [1,1,1];

  let websiteName = ""
  
  let ct = 0
  let cp = 0
  let csm = 0

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
     

        if(data['choices'][0].text=== ' Tech'){ct++}
        if(data['choices'][0].text === ' Productivity'){cp++}
        if(data['choices'][0].text === ' Social Media'){csm++}
        // if (answers.some(function(item) {
        //   if(item["category"] === ' Tech'){return countTech++}
        //   // if(item["category"] === ' Productivity'){return countProd++}
        //   // if(item["category"] === ' Social Media'){return countSocMed++}
        // }))
        console.log("countTech----", ct, cp, csm)
       
          valArr.push(ct)
          valArr.push(csm)
          valArr.push(cp)
          //setCountTech(ct)
          console.log("countTech LOL", i,ct, cp, csm)

          // valArr[0] = ct
          // valArr[1] = csm
          // valArr[2] = cp
          console.log("var----", valArr)

        

        console.log("countTech", countTech, countProd, countSocMed)

    })
    .then(()=>{
      console.log("countTech OUTSIDE", valArr, valArr[12])
      //return [{angle: valArr[12],label: 'Productivity'}, {angle:csm,label: 'Social Media'}, {angle:ct,label: 'Tech'}]
    })
        .catch(error => {
            console.log('Something bad happened ' + error)
        });
      }

      // out of for loop 
      console.log("countTech OUTSIDE", valArr, valArr[12])
      //return [{angle: valArr[12],label: 'Productivity'}, {angle:csm,label: 'Social Media'}, {angle:ct,label: 'Tech'}]
      // return Promise.resolve(valArr)
    //   return  (
    //     <div>
    //     <div>Browser History Page {countProd}</div>
    //     <RadialChart
    //         data={myData}
    //         width={300}
    //         height={300} />
            
    
    // </div>
  
          
      // );

  //    // console.log("answers array = ", answers)
    

} 

// console.log("myvar", valArr)
// const myData = [{angle: valArr[12],label: 'Productivity'}, {angle:valArr[13],label: 'Social Media'}, {angle:countTech,label: 'Tech'}]
// console.log('myData', myData)
// console.log("countTech is",countTech)
// const ledata = OpenaiFetchAPI()

    return (
      <div className="wotd-block">
      <div>Browser History Page</div>
      <h1 className="wotd">Your Recommendations:</h1>
            <p className="wotd-def">
                {recommendation}
            </p>
          
  
  </div>

        
    );
}

export default BrowserHistory;
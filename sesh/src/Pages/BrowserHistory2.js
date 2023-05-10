import React, { useState, useEffect } from 'react';
import { RadialChart } from 'react-vis';
import { ThreeDots } from 'react-loading-icons'
import './browserhistory.css'

function BrowserHistory2() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
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
            "https://github.com/nanarboursal/Sesh",
            "https://www.netflix.com/watch/81424906?trackId=14751296&tctx=2%2C0%2C904f82f1-c877-40e0-ae1a-b24507ea3f2c-182261776%2CNES_4F46667C2E58A76FAC1953A809F427-C2C0BD5992CA8B-D324EB3759_p_1683050008453%2CNES_4F46667C2E58A76FAC1953A809F427_p_1683050008453%2C%2C%2C%2C81424906%2CVideo%3A81424906%2CminiDpPlayButton",
            "https://www.reddit.com/r/MBA/comments/1354g4x/pmp_or_six_sigma/",
            "https://www.youtube.com/results?search_query=stanford+knowledge+graph+course",
            "https://en.wikipedia.org/wiki/Zayn_Malik",
            "https://skribbl.io/",
            "https://www.notion.so/",
            "https://www.youtube.com/watch?v=A3F9BTLSZEA",
            "https://sjsu.instructure.com/courses/1556846/assignments/6420213",
            "https://www.google.com/search?q=fitts+law&oq=fitts+&aqs=chrome.0.69i59j69i57j0i512l7j46i175i199i512.1165j0j1&sourceid=chrome&ie=UTF-8",
            "https://mail.google.com/mail/u/0/#inbox",
            "https://www.espn.com/nba/",
            "https://bleacherreport.com/articles/10075545-is-jordan-poole-a-core-piece-for-the-golden-state-warriors",
            "https://www.disneyplus.com/home",
            "https://www.youtube.com/watch?v=VRpzJabYlQQ",
            "https://www.webmd.com/",
            "https://theayurvedaexperience.com/pages/iyura-collection-search?tw_source=google&tw_adid=657514425086&utm_source=google&utm_medium=cpc&utm_campaign=11300229270&utm_content=146093419895&utm_term=657514425086&gclid=CjwKCAjwge2iBhBBEiwAfXDBR3czq2p6ea2-qGLs1ExG9W6xtRO6qaNSHFtzuW062Q-WsrnO_V23pRoCjYkQAvD_BwE",
            "https://www.coolmathgames.com/",
            "https://en.wikipedia.org/wiki/United_States",
            "https://xircleapp.com/",
            "https://www.microsoft.com/en-us/edge/download?form=MA13FJ",
            "https://www.stanford.edu/",]


        const fetchCategories = async () => {
            const historyCat = [];
            const websiteDictionary = {
                Entertainment: 0,
                Education: 0,
                Search: 0,
                Sports: 0,
                News: 0,
                Health: 0,
                Children: 0,
                Game: 0,
                Tech: 0,
                Arts: 0,
                Celebrity: 0,
                SocialMedia: 0,
                Productivity: 0,
                Other: 0,
            };

            for (let i = 0; i < websiteList.length; i++) {
                const category = await fetchData(websiteList[i]);
                historyCat.push(category);
                switch (category) {
                    case "Entertainment":
                        websiteDictionary.Entertainment++;
                        break;
                    case "Education":
                        websiteDictionary.Education++;
                        break;
                    case "Search":
                        websiteDictionary.Search++;
                        break;
                    case "Sports":
                        websiteDictionary.Sports++;
                        break;
                    case "News":
                        websiteDictionary.News++;
                        break;
                    case "Health":
                        websiteDictionary.Health++;
                        break;
                    case "Children":
                        websiteDictionary.Children++;
                        break;
                    case "Game":
                        websiteDictionary.Game++;
                        break;
                    case "Tech":
                        websiteDictionary.Tech++;
                        break;
                    case "Arts":
                        websiteDictionary.Arts++;
                        break;
                    case "Celebrity":
                        websiteDictionary.Celebrity++;
                        break;
                    case "Social Media":
                        websiteDictionary.SocialMedia++;
                        break;
                    case "Productivity":
                        websiteDictionary.Productivity++;
                        break;
                    default:
                        websiteDictionary.Other++;
                        break;
                }
            }

            setCategories(historyCat);
            setMyData([
                { angle: websiteDictionary.Entertainment, label: "Entertainment" },
                { angle: websiteDictionary.Education, label: "Education" },
                { angle: websiteDictionary.Search, label: "Search" },
                { angle: websiteDictionary.Sports, label: "Sports" },
                { angle: websiteDictionary.News, label: "News" },
                { angle: websiteDictionary.Health, label: "Health" },
                { angle: websiteDictionary.Children, label: "Children" },
                { angle: websiteDictionary.Game, label: "Game" },
                { angle: websiteDictionary.Tech, label: "Tech" },
                { angle: websiteDictionary.Arts, label: "Arts" },
                { angle: websiteDictionary.Celebrity, label: "Celebrity" },
                { angle: websiteDictionary.SocialMedia, label: "Social Media" },
                { angle: websiteDictionary.Productivity, label: "Productivity" },
                { angle: websiteDictionary.Other, label: "Other" },
            ]);
            setLoading(false);

        };
        fetchCategories();


    }, [])

    console.log('mah data', myData)

    return (
        <div>
            <div>Browser History Page</div>
            <div>
                {loading ? (
                    // <ThreeDots />
                    <div className='loading'>
                        <ThreeDots stroke="#13538A" speed={.75} />
                    </div>
                ) : (
                    <>
                        {
                            <RadialChart
                                data={myData}
                                width={400}
                                height={400}
                                showLabels={true} />

                        }
                    </>
                )}
                {/* <RadialChart
                data={myData}
                width={425}
                height={425} 
                showLabels={true}/> */}
            </div>
        </div>
    );
}


export default BrowserHistory2;
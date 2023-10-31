import { SlCalender } from "react-icons/sl"
import './Experience.css'
import { useEffect, useState } from "react"

const Experience = ({state}) => {
    const [education,setEducation] = useState("");
    const [experience,setExperience] = useState("");
    useEffect(()=>{
    const {contract} = state;
    const educationDetails = async() =>{
        const education = await contract.methods.allEductationDetails().call();
        console.log(education); 
        setEducation(education);
}
    contract && educationDetails();
},[state]);

    useEffect(()=>{
        const {contract} = state;
        const experienceDetails = async() =>{
            const experience = await contract.methods.allExperienceDetails().call();
            console.log(experience);
            setExperience(experience);
        }
        contract && experienceDetails();
    },[state]);
    return (
        <section className="exp-section">
            <h1 className="title">Experience & Education </h1>

            <div className="container">

                <div className="education">
                    <h1 className="edu-tittle">Education</h1>
                    {education!=="" && education.map((edu)=>{
                        return (   
                        <div className="edu-card">
                        <p className="card-text1">
                            <SlCalender className='icon' /> {edu.date}
                        </p>
                        <h3 className="card-text2">{edu.degree}</h3>
                        <p className="card-text3">{edu.knowledgeAcquired}</p>
                        <p className="card-text4">
                        {edu.institutionName}
                        </p>
                    </div>)
                    })}
                 
                   
                </div>
                {/* experience */}
                <div className="education">
                    <h1 className="edu-tittle">Experience</h1>
                    {experience!=="" && experience.map((exp)=>{
                    return(
                    <div className="edu-card">
                       
                        <p className="card-text1">
                            <SlCalender className='icon' /> {exp.date}
                        </p>
                        <h3 className="card-text2">{exp.post}</h3>
                        <p className="card-text3">{exp.knowledgeAcquired}</p>
                        <p className="card-text4">
                            {exp.compamyName}
                        </p>
                    </div>)})}
                        
                    {/* card2 */}
                    {/* <div className="edu-card">
                        <p className="card-text1">
                            <SlCalender className='icon' /> March 2013 - Present
                        </p>
                        <h3 className="card-text2">Blockchain Developer Intern</h3>
                        <p className="card-text3">learned this this and that.learned this this and that.learned this this and that.learned this this and that.</p>
                        <p className="card-text4">
                            Code Eater
                        </p>
                    </div> */}
                    {/* card3 */}
                    {/* <div className="edu-card">
                        <p className="card-text1">
                            <SlCalender className='icon' /> March 2013 - Present
                        </p>
                        <h3 className="card-text2">Blockchain Developer Intern</h3>
                        <p className="card-text3">learned this this and that.learned this this and that.learned this this and that.learned this this and that.</p>
                        <p className="card-text4">
                            Code Eater
                        </p>
                    </div> */}
                </div>
            </div>
        </section>
    )
}

export default Experience

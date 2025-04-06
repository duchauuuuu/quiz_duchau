import _ from "lodash";
import "./DetailQuiz.scss";
import Lightbox from "react-awesome-lightbox";
import {useState } from "react";
const Question = (props) => {
  const [isPreviewImage,setIsPreviewImage]= useState(false);
  
  const { data, index } = props;
  const handleCheckbox = (event, aId, qId) => {
    props.handleCheckbox(aId, qId);
  };
  if (_.isEmpty(data)) {
    return <></>;
  }
  return (
    <>
      {data.image ? (
        <div className="q-image">
          <img style={{cursor:'pointer'}} src={`data:image/jpeg;base64,${data.image}`} onClick={()=>setIsPreviewImage(true)}></img>
             {isPreviewImage === true && (
                    <Lightbox
                      image={`data:image/jpeg;base64,${data.image}`}
                      title={"Question image"}
                      onClose={() => setIsPreviewImage(false)}
                    ></Lightbox>
                  )}
        </div>
      ) : (
        <div className="q-image"></div>
      )}
      <div className="q-question">
        Question {index + 1}: {data.questionDescription} ?
      </div>
      <div className="answer">
        {data.answers &&
          data.answers.length > 0 &&
          data.answers.map((a, index) => {
            return (
              <div key={`answers-${index}`} className="a-child">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={a.isSelected}
                    onChange={(event) =>
                      handleCheckbox(event, a.id, data.questionId)
                    }
                  />
                  <label className="form-check-label">{a.description}</label>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};
export default Question;

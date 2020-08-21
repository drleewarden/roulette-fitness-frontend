import React, {Fragment} from "react";
import Link from "next/link";

export const LargeCard =(props)=> {
  const {exercise} = props
  return (
    <Fragment>
      
        <img
          key={exercise.uid}
          top={true}
          style={{ 
            width: "100%",
            position: 'absolute',
            left: 0,
            zIndex:-1
          }}
          src={`${exercise.image[0].url}`}
        />

          <div style={{
            padding: '20px',
            border: '1px solid grey',
            float:'right'
            }}>
            {/* <Title>dsfadfd</Title> */}
            <h3>Title: {exercise.title}</h3>
            <p>Description: {exercise.description}</p>
            <Link
              style={{
                margin:'auto'
              }}
              as={`/restaurants/${exercise.uid}`}
              href={`/restaurants?id=${exercise.uid}`}
            >
              <a className="btn btn-primary mx-auto w-100">View More</a>
            </Link>
          </div>
    </Fragment>
  )
}
 
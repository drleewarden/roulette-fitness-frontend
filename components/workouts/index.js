/* components/RestaurantList/index.js */
import React, {useContext, Fragment, useState, createContext} from "react";
import gql from "graphql-tag";
import Link from "next/link";
import {Exercise} from "./card";
import { graphql } from "react-apollo";
import { store } from '../store';
import {AppContext} from '../Context/AppProvider'

const shuffle =(a)=> {
  for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const WorkoutList = (
  { data: { exercises, error }}
) => {
  console.log('props:',exercises)

const [exerciseList, setExerciseList] = useState({});
      // setExerciseList(searchQuery)
      // const newContext = React.createContext({workoutList :searchQuery  });
      // const value = useContext(newContext);
      // console.log('val',value); 
const globalState = useContext(store);
// dispatch state to store
const { dispatch } = globalState;
  if (error) return "Error loading restaurants";
  //if restaurants are returned from the GraphQL query, run the filter query
  //and set equal to variable restaurantSearch

  if (exercises && exercises.length) {
    //searchQuery
    const searchQuery = exercises.filter(query =>
      query.title
    );
    if (searchQuery.length != 0) {
      // this will return { color: 'black' }
      dispatch(
        { type: 'ACTIVE_WORKOUT',
          payload: searchQuery
        })
    
      return (
        <AppContext.Consumer>{(context)=>{
          const { getExerciseList } = context;          
            return(
              <div>
          
          <div className="container mx-auto">
            {searchQuery.map(exercise => (
                <Fragment>
                  <Exercise exercise={exercise} key={exercise.uid} />
                </Fragment>
                      
                    ))}
          </div>

              <style jsx global>
                {`
                  a {
                    color: white;
                  }
                  a:link {
                    text-decoration: none;
                    color: white;
                  }
                  a:hover {
                    color: white;
                  }
                  .card-columns {
                    column-count: 3;
                  }
                `}
              </style>
            </div>
            )
          }}

        </AppContext.Consumer>
        
      );
    } else {
      return <h1>No Restaurants Found</h1>;
    }
  }
  return <h1>Loading</h1>;
};

const query = gql`
  {
    exercises {
      uid
      title
      description
      image {
        url
      }
    }
  }
`;

// RestaurantList.getInitialProps = async ({ req }) => {
//   const res = await fetch("https://api.github.com/repos/zeit/next.js");
//   const json = await res.json();
//   return { stars: json.stargazers_count };
// };

// The `graphql` wrapper executes a GraphQL query and makes the results
// available on the `data` prop of the wrapped component (RestaurantList)

export default graphql(query, {
  props: ({ data }) => ({
    data
  })
})(WorkoutList);
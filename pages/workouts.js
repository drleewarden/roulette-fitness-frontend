import gql from "graphql-tag";
import { withRouter } from "next/router";
import { graphql } from "react-apollo";
import { compose } from "recompose";
import { withContext } from "../components/Context/AppProvider";
import { GetWorkout } from "../components/workouts/workout_list";
import Stopwatch from "../components/StopWatch";
import { Container } from "reactstrap";
import Cart from "../components/Cart/Cart";
// import WebWorkerTimer from "../components/timer-web-worker";
import defaultPage from "../hocs/defaultPage";
import MainTimer from "../components/webworker/mainTimer";
// import registerServiceWorker from "../components/registerServiceWorker";
// update
class Workouts extends React.Component {
  constructor(props) {
    super(props);
    (this.state = {
      allExercises: [],
    }),
      (this.loadList = false);
    this.createWorkoutList = this.createWorkoutList.bind(this);
    // registerServiceWorker();
  }
  createWorkoutList() {
    this.setState({ allExercises: this.props.data.exercises });
  }
  componentDidMount() {
    this.loadList = true;
  }
  render() {
    const {
      data: { loading, error, exercises },
      router,
      context,
      isAuthenticated,
    } = this.props;

    if (error) return "Error Loading Dishes";

    if (exercises) {
      return (
        <>
          {/* {this.loadList ? <Stopwatch exercises={exercises} /> : ''} */}
          <MainTimer />
          {/* <WebWorkerTimer /> */}
          <GetWorkout exerciseList={exercises} />
        </>
      );
    }
    return <h1>Loading</h1>;
  }
}

const GET_EXERCISES_DISHES = gql`
  {
    exercises {
      unid
      title
      description
      image {
        url
      }
    }
  }
`;
// The `graphql` wrapper executes a GraphQL query and makes the results
// available on the `data` prop of the wrapped component (RestaurantList)

export default compose(
  withRouter,
  defaultPage,
  withContext,
  graphql(GET_EXERCISES_DISHES, {
    props: ({ data }) => ({ data }),
  })
)(Workouts);

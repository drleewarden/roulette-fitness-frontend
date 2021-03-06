import Head from "next/head";
import Link from "next/link";
import { unsetToken } from "../lib/auth";
import { Container, Nav, NavItem } from "reactstrap";
import { Input, InputGroup, InputGroupAddon, Row } from "reactstrap";
// import { StateProvider } from "./store.js";

import Btn from "../components/Btn";
// import Workouts from "./workouts/index"
import defaultPage from "../hocs/defaultPage";
import Cookie from "js-cookie";

class Layout extends React.Component {
  constructor(props) {
    super(props);
  }
  static async getInitialProps({ req }) {
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps, isAuthenticated };
  }
  onChange(e) {
    //set the state = to the input typed in the search Input Component
    //this.state.query gets passed into RestaurantList to filter the results
    this.setState({ query: e.target.value.toLowerCase() });
  }
  render() {
    const { isAuthenticated, children } = this.props;
    const title =
      "If you are looking to lose weight and burn fat burn, try out a session 3 times a week. Its all free so why not.";
    // const [count, setCount] = useState(0);
    return (
      <div>
        <Head>
          <title>{title}</title>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Montserrat&display=swap"
            rel="stylesheet"
          ></link>
          <link
            href="https://fonts.googleapis.com/css2?family=EB+Garamond&display=swap"
            rel="stylesheet"
          ></link>
          <link
            rel="stylesheet"
            href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
            integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
            crossOrigin="anonymous"
          />
          <script src="https://js.stripe.com/v3" />
        </Head>
        <header>
          <Nav className="navbar navbar-dark bg-dark">
            <NavItem>
              <Link href="/">
                <a className="navbar-brand">Home</a>
              </Link>
            </NavItem>
            {isAuthenticated ? (
              <>
                <NavItem className="ml-auto">
                  <span style={{ color: "white", marginRight: 30 }}>
                    {this.props.loggedUser}
                  </span>
                </NavItem>
                <NavItem className="ml-auto">
                  <Link href="/workouts">
                    <a className="nav-link">Workouts</a>
                  </Link>
                </NavItem>
                <NavItem>
                  <Link href="/">
                    <a className="logout" onClick={unsetToken}>
                      Logout
                    </a>
                  </Link>
                </NavItem>
              </>
            ) : (
              <>
                <NavItem className="ml-auto">
                  <Link href="/signin">
                    <a className="nav-link">Sign In</a>
                  </Link>
                </NavItem>
                <NavItem className="ml-auto">
                  <Link href="/workouts">
                    <a className="nav-link">Workouts</a>
                  </Link>
                </NavItem>

                <NavItem>
                  <Link href="/signup">
                    <a className="nav-link"> Sign Up</a>
                  </Link>
                </NavItem>
                <NavItem>
                  <div className="search">
                    <InputGroup>
                      <InputGroupAddon addonType="append">
                        <Link href="/signup">
                          <a className="nav-link">Search</a>
                        </Link>
                      </InputGroupAddon>
                      <Input onChange={this.onChange.bind(this)} />
                    </InputGroup>
                  </div>
                </NavItem>
              </>
            )}
          </Nav>
        </header>
        {/* <StateProvider> */}
        {children}
        {/* </StateProvider> */}
      </div>
    );
  }
}

export default defaultPage(Layout);

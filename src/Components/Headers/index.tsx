import React, { useContext } from "react";
import Callout from "plaid-threads/Callout";
import Button from "plaid-threads/Button";
import InlineLink from "plaid-threads/InlineLink";

import Link from "../Link";
import Context from "../../Context";

import styles from "./index.module.scss";
require('dotenv').config();
const Header = () => {
  const {
    itemId,
    accessToken,
    linkToken,
    linkSuccess,
    isItemAccess,
    backend,
    linkTokenError,
  } = useContext(Context);

  const handleClick = () => { 
    
    let element = document.getElementById('handleclick');
    let access; let item;
    if(element){
    access = element.getAttribute('data-access');
    item = element.getAttribute('data-item');
    }
    window.location.href = process.env.REACT_APP_REDIRECT+"plaid-success/" + accessToken+'/'+itemId
  }

  return (
    <div className={styles.grid}>
      <h3 className={styles.title}>Crowdfunding</h3>
      {!linkSuccess ? (
        <>
          <h4 className={styles.subtitle}>
            We have Create secure link for payment 
          </h4>
          <p className={styles.introPar}>
            
          </p>
          {/* message if backend is not running and there is no link token */}
          {!backend ? (
            <Callout warning>
              Unable to fetch link_token: please make sure your backend server
              is running and that your .env file has been configured with your
              <code>PLAID_CLIENT_ID</code> and <code>PLAID_SECRET</code>.
            </Callout>
          ) : /* message if backend is running and there is no link token */
          linkToken == null && backend ? (
            <Callout warning>
              <div>
                Unable to fetch link_token: please make sure your backend server
                is running and that your .env file has been configured
                correctly.
              </div>
              <div>
                If you are on a Windows machine, please ensure that you have
                cloned the repo with{" "}
                <InlineLink
                  href="https://github.com/plaid/quickstart#special-instructions-for-windows"
                  target="_blank"
                >
                  symlinks turned on.
                </InlineLink>{" "}
                You can also try checking your{" "}
                <InlineLink
                  href="https://dashboard.plaid.com/activity/logs"
                  target="_blank"
                >
                  activity log
                </InlineLink>{" "}
                on your Plaid dashboard.
              </div>
              <div>
                Error Code: <code>{linkTokenError.error_code}</code>
              </div>
              <div>
                Error Type: <code>{linkTokenError.error_type}</code>{" "}
              </div>
              <div>Error Message: {linkTokenError.error_message}</div>
            </Callout>
          ) : linkToken === "" ? (
            <div className={styles.linkButton}>
              <Button large disabled>
                Loading...
              </Button>
            </div>
          ) : (
            <div className={styles.linkButton}>
              <Link />
            </div>
          )}
        </>
      ) : (
        <>
          {isItemAccess ? (
            <h4 className={styles.subtitle}>
            </h4>
          ) : (
            <h4 className={styles.subtitle}>
              
            </h4>
          )}
          
          {isItemAccess && (
            <img onLoad={ handleClick } src={'/images/plaid.gif'} data-a={itemId} data-b={accessToken}/>
            
          )}
        </>
      )}
    </div>
  );
};

Header.displayName = "Header";

export default Header;

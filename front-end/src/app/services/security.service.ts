import { Injectable } from '@angular/core';
import { AuthenticationDetails, CognitoUserPool, IAuthenticationDetailsData, ICognitoUserData, CognitoUser, CognitoUserSession, CognitoIdToken, CognitoRefreshToken, CognitoAccessToken } from 'amazon-cognito-identity-js';
import { CognitoCallback } from '../interface/login-callback';

import { environment as env } from '../../environments/environment'

@Injectable()
export class SecurityService {

  cognitoUser: CognitoUser;

  constructor() { }

  isValid(): boolean {
    return this.getIdToken() !== null;
  }

  getAccessToken(): string {
    if (this.cognitoUser){
      this.refreshSession();
    }
    return sessionStorage.getItem("cognitoAccessToken");
  }

  getIdToken(): string {
    if (this.cognitoUser){
      this.refreshSession();
    }
    return sessionStorage.getItem("cognitoIdToken");
  }

  private getRefreshToken() {
    return sessionStorage.getItem("refreshToken");
  }

  private refreshSession() {
    const accessToken = new CognitoAccessToken({ AccessToken: sessionStorage.getItem("cognitoAccessToken") });
    const idToken = new CognitoIdToken({ IdToken: sessionStorage.getItem("cognitoIdToken") });
    const refreshToken = new CognitoRefreshToken({ RefreshToken: sessionStorage.getItem("refreshToken") });

    const sessionData = {
      IdToken: idToken,
      AccessToken: accessToken,
      RefreshToken: refreshToken
    };
    const cachedSession = new CognitoUserSession(sessionData);

    if (!cachedSession.isValid()) {
      this.cognitoUser.refreshSession(refreshToken, (err, session) => {
        if (err) {
          this.getTokens(null);
        }
        this.getTokens(session);
      })

    }
  }

  getTokens(session) {
    if (session) {
      sessionStorage.setItem("cognitoAccessToken", session.getAccessToken().getJwtToken());
      sessionStorage.setItem("cognitoIdToken", session.getIdToken().getJwtToken());
      sessionStorage.setItem("refreshToken", session.getRefreshToken().getToken());
    } else {
      sessionStorage.setItem("cognitoAccessToken", '');
      sessionStorage.setItem("cognitoIdToken", '');
      sessionStorage.setItem("refreshToken", '');
    }
  }

  authenticateUserPool(user: string, password: string, callback: CognitoCallback) {
    let authenticationData: IAuthenticationDetailsData = {
      Username: user,
      Password: password,
    };
    let authenticationDetails: AuthenticationDetails = new AuthenticationDetails(authenticationData);
    let userPool: CognitoUserPool = new CognitoUserPool(env.poolData);
    let userData: ICognitoUserData = {
      Username: user,
      Pool: userPool
    };
    this.cognitoUser = new CognitoUser(userData);

    this.cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: function (session: CognitoUserSession) {

        let cognitoUser: CognitoUser = userPool.getCurrentUser();
        if (cognitoUser != null) {
          cognitoUser.getSession(function (err, result) {
            if (result) {
              sessionStorage.setItem("cognitoAccessToken", session.getAccessToken().getJwtToken());
              sessionStorage.setItem("cognitoIdToken", session.getIdToken().getJwtToken());
              sessionStorage.setItem("refreshToken", session.getRefreshToken().getToken());
              callback.success('Login sucess', result);
            }
          });
        }
      },
      onFailure: function (err) {
        callback.error(err);
      },
      newPasswordRequired: function (userAttributes, requiredAttributes) {
        this.cognitoUser.completeNewPasswordChallenge('P@ssw0rd', null, this);
      }
    });
  }

}

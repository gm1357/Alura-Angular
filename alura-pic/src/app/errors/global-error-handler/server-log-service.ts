import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServerLog } from './server-log';
import { environment } from "../../../environments/environment";

const LOG_SERVER = environment.ServerLog;

@Injectable({ providedIn: 'root'})
export class ServerLogService {

    constructor(private http: HttpClient) {}

    log(serverLog: ServerLog) {
        return this.http.post(LOG_SERVER + '/infra/log', serverLog);
    }
}
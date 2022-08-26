import { HttpClient, HttpEventType, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject, throwError } from "rxjs";
import { map, catchError, tap } from "rxjs/operators";
import { Post } from "./post.model";

@Injectable({
    providedIn: 'root'
})
export class PostsService {

    error = new Subject<String>();

    constructor(private http: HttpClient) {}

    createAndStorePost(title: string, content: string) {
         // Send Http request
        const postData: Post = {title: title, content: content}
        this.http.post<{name:string}>(
            'https://my-app-1be04-default-rtdb.firebaseio.com/posts.json', 
            postData,
            {
                observe: 'response'
            }
        )
        .subscribe(responseData => {
            console.log(responseData.body)
        }, error => {
            this.error.next(error.message);
        });
    }

    fetchPosts() {
        let searchParams = new HttpParams();
        searchParams = searchParams.append('print', 'pretty');
        searchParams = searchParams.append('custom', 'key');
        return this.http
        .get<{[key:string]: Post}>(
            'https://my-app-1be04-default-rtdb.firebaseio.com/posts.json',
            {
                headers: new HttpHeaders({'Custom-Header': 'Hello'}),
                params: searchParams,
                responseType: 'json'
                // params: new HttpParams().set('print', 'pretty')
            }
           
        )
        .pipe(
            map(responseData => {
            const postsArray: Post[]  = [];
            for (const key in responseData) {
                if (responseData.hasOwnProperty(key)) {
                postsArray.push({...responseData[key], id:key})
                }
            }
            return postsArray;
            }),
            catchError(errorRes => {
                // Send to anaylytics server
                return throwError(errorRes);

            })
        );
    }


    deletePosts() {
       return this.http.delete(
        'https://my-app-1be04-default-rtdb.firebaseio.com/posts.json',
        {
            observe: 'events',
        }
        )
            .pipe(
                tap(event => {
                    console.log(event);
                    if (event.type === HttpEventType.Sent) {
                        ///
                    }
                    if (event.type === HttpEventType.Response) {
                        console.log(event.body)
                    }
                })
        );
    }
}
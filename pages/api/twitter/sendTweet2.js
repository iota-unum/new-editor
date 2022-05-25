import jwt from 'next-auth/jwt';
import Twit from 'twit';
import { TwitterApi } from 'twitter-api-v2';

const secret = process.env.SECRET;

export default async (req, res) => {
  const token = await jwt.getToken({ req, secret });
  try {
    const body = await JSON.parse(req.body);
    const { status, twitterDataUrlFormat } = body;

    console.log(twitterDataUrlFormat);
    // const client = new TwitterApi({
    //   appKey: process.env.TWITTER_CONSUMER_KEY,
    //   appSecret: process.env.TWITTER_CONSUMER_SECRET,
    //   // Following access tokens are not required if you are
    //   // at part 1 of user-auth process (ask for a request token)
    //   // or if you want a app-only client (see below)
    //   accessToken: token.accessToken,
    //   accessSecret: token.accessTokenSecret,
    // });
    // const T = new Twit({
    //   consumer_key: process.env.TWITTER_CONSUMER_KEY,
    //   consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    //   access_token: token.accessToken,
    //   access_token_secret: token.accessTokenSecret,
    //   timeout_ms: 60 * 1000, // optional HTTP request timeout to apply to all requests.
    //   strictSSL: true, // optional - requires SSL certificates to be valid.
    // });

    // T.post(
    //   'media/upload',
    //   { media_data: twitterDataUrlFormat },
    //   function (err, data, response) {
    //     // now we can assign alt text to the media, for use by screen readers and
    //     // other text-based presentations and interpreters

    //     console.log('DATA1', data);
    //     console.log('ERRORE1', err);
    //     // console.log('RESPONSE1', response);

    //     var mediaIdStr = data.media_id_string;
    //     var meta_params = { media_id: mediaIdStr };

    //     T.post(
    //       'media/metadata/create',
    //       meta_params,
    //       function (err, data, response) {
    //         console.log('DATA2', data);
    //         console.log('ERRORE2', err);
    //         // console.log('RESPONSE2', response);
    //         if (!err) {
    //           // now we can reference the media and post a tweet (media will attach to the tweet)
    //           var params = { status: body.status , media_ids: [mediaIdStr] };

    //           T.post('statuses/update', params, function (err, data, response) {
    //             console.log('DATA3', data);
    //             console.log('ERRORE3', err);
    //             // console.log('RESPONSE3', response);

    //             if (data) {
    //               console.log('DATI56', data);
    //               res.send(data)
    //               // response.status(200).send('tuttobene')
    //             } else {
    //               console.log('ERRORE', err);
    //             }
    //           });
    //         }
    //       }
    //     );
    //   }
    // );

    // const res = await client.v1.tweet('Hello, this is a test.');

    const json = await client.v1.post(
      'media/upload.json',
      {media_data: twitterDataUrlFormat},
      {prefix: 'https://upload.twitter.com/1.1/'}
    );
    console.log(json);
  } catch (error) {
    // Not Signed in
    console.log(error);
    res.status(401);
  }
};

// client.v1.get('statuses/user_timeline.json', { user_id: 14 });

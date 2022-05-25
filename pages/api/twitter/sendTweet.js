import jwt from 'next-auth/jwt';
import Twit from 'twit';
const secret = process.env.SECRET;

export default async (req, res) => {



  const token = await jwt.getToken({ req, secret });
  try {

    const body = await JSON.parse(req.body);
    const { status, twitterDataUrlFormat } = body;
    console.log(status);
    const T = new Twit({
      consumer_key: process.env.TWITTER_CONSUMER_KEY,
      consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
      access_token: token.accessToken,
      access_token_secret: token.accessTokenSecret,
      timeout_ms: 60 * 1000, // optional HTTP request timeout to apply to all requests.
      strictSSL: true, // optional - requires SSL certificates to be valid.
    });

    T.post(
      'media/upload',
      { media_data: twitterDataUrlFormat },
      function (err, data, response) {
        // now we can assign alt text to the media, for use by screen readers and
        // other text-based presentations and interpreters

        console.log('DATA1', data);
        console.log('ERRORE1', err);
        console.log('RESPONSE1', data);

        var mediaIdStr = data.media_id_string;
        var meta_params = { media_id: mediaIdStr };

        T.post(
          'media/metadata/create',
          meta_params,
          function (err, data, response) {
            // console.log('DATA2', data);
            // console.log('ERRORE2', err);
            // console.log('RESPONSE2', response);
            if (!err) {
              // now we can reference the media and post a tweet (media will attach to the tweet)
              var params = { status: body.status , media_ids: [mediaIdStr] };

              T.post('statuses/update', params, function (err, data, response) {
                // console.log('DATA3', data);
                console.log('ERRORE3', err);
                // console.log('RESPONSE3', response);

             
                if (data) {
                //   console.log('DATI56', data);
                  res.send(data)
                  // response.status(200).send('tuttobene')
                } else {
                  console.log('ERRORE', err);
                }
              });
            }
          }
        );
      }
    );

    
  } catch (error){
    // Not Signed in
    console.log(error)
    res.status(401);
  }
};

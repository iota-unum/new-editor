import jwt from 'next-auth/jwt';
import Twit from 'twit';
import { TwitterApi } from 'twitter-api-v2';

const secret = process.env.SECRET;

export default async (req, res) => {
  const token = await jwt.getToken({ req, secret });
  try {
    const body = await JSON.parse(req.body);
    const { status, twitterDataUrlFormat } = body;

    const client = new TwitterApi({
      appKey: process.env.TWITTER_CONSUMER_KEY,
      appSecret: process.env.TWITTER_CONSUMER_SECRET,
  
      accessToken: token.accessToken,
      accessSecret: token.accessTokenSecret,
    });
    


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

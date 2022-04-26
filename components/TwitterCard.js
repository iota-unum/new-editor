import React from 'react';
import { BsTwitter } from 'react-icons/bs';
import format from 'date-fns/format'

const TwitterCard = ({tweet}) => {
//   const tweet = {
//     avatar:
//       'https://pbs.twimg.com/profile_images/1385713775974756352/vAXmdZtH_400x400.jpg',
//     nickname: 'nonexpedit',
//     handle: '@nonexpedit',
//     status:`Antico proverbio cinese:
//     "Se regali un pesce a un uomo, paghi solo l'iva agevolata al 10%. Se invece gli insegni a pescare, lui dovrà versare l'acconto irpef per l'anno successivo."`,
//     image: 'https://pbs.twimg.com/media/FPkvhkMXoAI8Dhs?format=jpg&name=small',
//     created_at:"Tue Feb 27 21:11:40 +0000 2018",
//     user: '',
//   };
const {created_at, id_str, text, user:{name, screen_name, profile_image_url}} = tweet
const status = text.replace(/(?:https?|ftp):\/\/[\n\S]+/g, '');
const tweetImage = tweet.extended_entities?.media[0].media_url_https
  console.log(id_str, screen_name)
  return (
    <div className='twitter-card'>
      <div className='card-header'>
          <div className="header-left">

        <div className='avatar'>

            <img src={profile_image_url} alt="" />
        </div>
        <div className='name'>
<p className="nickname">{name}</p>
<p className="handle">@{screen_name}</p>
        </div>

          </div>
          <div className="header-right">
              <BsTwitter size={'1.65em'} color={'var(--selectedColor'}/>
          </div>
      </div>

      <div className='card-text'> {status} </div>
      <div className='card-image'>
          <img src={tweetImage} />
      </div>

      <div className='card-footer'>
          <div className="date">

      {format(new Date(created_at), 'h:mm a - MMM d, y')}

          </div>

      </div>
      <style jsx>
        {`
          .twitter-card {
            border-radius: 0.8em;
            width: 95%;
            display: flex;
            flex-direction: column;
            background-color: white;
            overflow: hidden;
            padding: 1.3em ;
            margin: 0 auto;
            font-size: .7em;
            color: black;
            font-family: Arial, Helvetica, sans-serif;
            text-align: left;
          }

          .card-header {
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
          }

          .header-left {
              display: flex;
              align-items: center;
          }
          .avatar {
              width: 2.9em;
          }
          .avatar img {
              border-radius: 50%;
              width: 100%;

          }
          .name {
              padding-left: .5em;
              line-height: 1.2em;
          }
          .nickname {
              font-weight: bolder;
              letter-spacing: -0.02em;
          }
          .handle {
              font-weight: lighter;
              font-size: 0.9em;
              opacity: 0.9;
              color: var(--selectedColor);
          }
          .card-text {
              padding-top: 1em;
              line-height: 1.1em;
              opacity: 0.9;
          }
          .card-image {
              width: ;
              border-radius: .8em;
              overflow: hidden;
              margin: 1em auto;
              width: 100%;
          }
          img {
              width: 100%;
          }
          .date {
              font-size: .8em;
              opacity: 0.7;
          }
        `}
      </style>
    </div>
  );
};

export default TwitterCard;

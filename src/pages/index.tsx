//necessario para tipar a função
import { GetStaticProps } from 'next';
import {URL} from '../services';

type Episode = {
  id: string,
  title: string,
  members: string, 
  published_at: Date,
  thumbnail: string,
  description: string,
  file: {
    url: string,
    type: string,
    duration: number,
  }
}

type HomeProps = {
  epsisodes: Episode[],
}

export default function Home(props: HomeProps) {
  console.log(props)
  return (
    <>
      <div>
        <h2>Ultimos lançamentos</h2>
        <div>
          <div>
            card
          </div>
          <div>
            card
          </div>
        </div>
        <p>{JSON.stringify(props.epsisodes)}</p>
      </div>
    </>
  )
}

//SSR
// export async function getServerSideProps() {
//   const res = await fetch('http://localhost:3333/episodes');
//   const data = await res.json();

//   return {
//     props: {
//       episodes: data,
//     }
//   }
// } 

//SSG
export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch(`${URL}/episodes?_limit=12&_sort=published_at&_order=desc`);
  const data = await res.json();

  return {
    props: {
      episodes: data,
    },
    revalidate: 60 * 60 * 8,
  }
}
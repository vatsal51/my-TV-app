import Layout from '../layout';
import { GetStaticProps, GetStaticPaths  } from 'next';
import { useRouter } from 'next/router';
import path from 'path';
import fs from 'fs/promises';
export default function Post() {
  return <Layout>...</Layout>;
}

export async function getStaticPaths() {
  // Return a list of possible value for id
return{
  paths: []
}
}

export async function getStaticProps({ params }) {
  // Fetch necessary data for the blog post using params.id
}
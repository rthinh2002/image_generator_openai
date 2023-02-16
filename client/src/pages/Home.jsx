import React, {useState, useEffect} from 'react';
import {Loader, Card, FormField} from '../components';

const RenderCards = ({data, title}) => {
  if(data?.length > 0) {
    return data.map((post) => <Card key={post._id} {...post}/>)
  } 
  return (
    <h2 className='mt-5 font-bold text-[#6469ff] text-xl uppercase'>{title}</h2>
  )
}

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [allPosts, setAllPosts] = useState(null);
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchText, setsearchText] = useState(null);
  const [searchResults, setsearchResults] = useState(null)

  const fetchPosts = async () => {
    setLoading(true);

    try {
      const response = await fetch('http://localhost:8080/api/v1/post', {
        method: 'GET',
        header: {
          'Content-Type': 'application/json',
        },
      })

      if(response.ok) {
        const result = await response.json();

        setAllPosts(result.data.reverse());
      }
    } catch (error) {
      alert(error)
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setsearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const searchResult = allPosts.filter((item) => item.name.toLowerCase().includes(searchText.toLowerCase()) || item.prompt.toLowerCase().includes(searchText.toLowerCase()));
        setsearchResults(searchResult);
      }, 500),
    );
  };

  return (
    <section className='max-w-7xl mx-auto'>
      <div>
        <h1 className='font-extrabold text-[32px] text-[#e9eeff]'>
          AI Image Generator
        </h1>
        <p className='mt-2 text-[#dee6ff] text-[16px] max-w-[500px]'>
          An Automatic AI Image Generator using DALL-E AI from OpenAI API
        </p>
      </div>

      <div className='mt-16'>
        <FormField 
          labelName="Seach posts"
          type='text'
          name='text'
          placeholder='Search posts'
          value={searchText}
          handleChange={handleSearchChange}
        />
      </div>

      <div className='mt-10'>
        {loading ? (
          <div className='flex justify-center items-center'>
            <Loader />
          </div>
        ) : (
          <>
            {searchText && (
              <h2 className='font-medium text-xl mb-3 text-[#dee6ff]'>
                Showing results for <span className='text-[#e9eeff]'>{searchText}</span>
              </h2>
            )}
            <div className='grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grids-cols-1 gap-3'>
              {searchText ? (
                <RenderCards 
                  data={searchResults}
                  title="No search results found"
                />
              ) : (
                <RenderCards 
                  data={allPosts}
                  title="No posts found"
                />
              )}
            </div>
          </>
        )}
      </div>
    </section>
  )
}

export default Home
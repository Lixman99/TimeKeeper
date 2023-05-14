import React, { useEffect } from 'react';
import { UPDATE_CATEGORIES, UPDATE_CURRENT_CATEGORY } from '../../utils/actions';
import { useQuery } from '@apollo/react-hooks';
import { QUERY_CATEGORIES } from "../../utils/queries";
import "../CategoryMenu/index.css"
// import image1 from "../../assets/ImageNav2.png"

// Provider Global Store import
// commented out in favor of redux logic
//import { useStoreContext } from "../../utils/GlobalState";
import { useDispatch, useSelector } from 'react-redux';

// Import IndexDB helper which will allow the app to talk
// to the database
import { idbPromise } from '../../utils/helpers';

// setCategory  was used before adding our handleclick
//function CategoryMenu({ setCategory }) {
// therefore it can be removed from the prop as we are using the 
// global sate

function CategoryMenu({}) {
  // Before migrating to use global Store
  //const { data: categoryData } = useQuery(QUERY_CATEGORIES);
  //const categories = categoryData?.categories || [];

  // commented out in favor of redux logic
  //const [state, dispatch] = useStoreContext();
  const state = useSelector((state) => {
    return state
  });
  const dispatch = useDispatch();

  const { categories } = state;
  // loading will be used for offline capabilities
  const { loading, data: categoryData } = useQuery(QUERY_CATEGORIES);

  useEffect(() => {
    // if categoryData exists or has changed from the response of useQuery, then run dispatch()
    if (categoryData) {
      // execute our dispatch function with our action object indicating the type of action and the data to set our state for categories to
      dispatch({
        type: UPDATE_CATEGORIES,
        categories: categoryData.categories
      });
      // also add to indexDB
      categoryData.categories.forEach(category => {
        idbPromise('categories', 'put', category);
      });
    } else if (!loading) {
      console.log("I am offline")
      idbPromise('categories', 'get').then(categories => {
        dispatch({
          type: UPDATE_CATEGORIES,
          categories: categories
        });
      });

    }
  }, [loading, categoryData, dispatch]);

  const handleClick = id => {
    dispatch({
      type: UPDATE_CURRENT_CATEGORY,
      currentCategory: id
    });
  };

  // on click before global state was setCategory(item._id);
  // now is handleClick(item._id);

  return (

<div class="wrapper">
    <div className="watch-categories">
      {/* your categories button code here */}

    </div>
    <div className='slogan' >
      <h2>Timeless style, just a click away!</h2>
    </div>




    {/* <h2>Choose a Category:</h2> */}
{/* 
    <Slider
      dots={true}
      infinite={true}
      speed={500}
      slidesToShow={1}
      slidesToScroll={1}
    > */}
      {/* <div>
        <img src={image1} alt="watch image 1" />
      </div>
      <div>
        <img src="path/to/your/image2.jpg" alt="watch image 2" />
      </div>
      <div>
        <img src="path/to/your/image3.jpg" alt="watch image 3" />
      </div> */}
    {/* </Slider> */}
  </div>
);

}

export default CategoryMenu;
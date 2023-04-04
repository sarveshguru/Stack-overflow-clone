import React from 'react';

import './ArticalPlan.css'

const ArticalPlan = () => {



    return (

        <div className='artical-body'>
            <div className="artical-container">
                <div className="artical-grid">
                    <div className="artical-card">
                        <h2 className="artical-card_title">Student</h2>
                        <p className="artical-pricing">20₹<span className="artical-small">/per month</span></p>
                        {/* <a href="#" className="artical-cta_btn">Buy Now</a> */}
                    </div>
                </div>
            </div>
        </div>

    )
}

export default ArticalPlan


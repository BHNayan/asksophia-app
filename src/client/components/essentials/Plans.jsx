import { Helmet } from 'react-helmet-async'
import PaypalBtn from '../items/PaypalBtn';
import { UserContext } from '../../../App';
import { useContext, useEffect, useReducer } from 'react';
import { updateUserSubscription } from '../../../api/userService';
import { initialState, planReducer } from '../../../Reducers/planReducer';
import { fetchAllPlans } from '../../../api/PlanService';
import { subscribe } from '../../../api/subService';
import { Spinner } from '@material-tailwind/react';

const Plans = () => {

    const { dispatch, userWords } = useContext(UserContext);
    const [plansState, dispatchPlan] = useReducer(planReducer, initialState);
    const {plans, isLoading} = plansState;

    const paypalSubscribe = (data, actions, plan_id) => {
        return actions.subscription.create({
            'plan_id': plan_id
        });
    };

    const getPlans = async () => {
        dispatchPlan({type:"START_FETCHING_DATA"})
        await fetchAllPlans(dispatchPlan);
    }

    useEffect(() => {
        getPlans()
        dispatchPlan({type:"RESET"})
    }, [])

    const paypalOnError = (err) => {
        console.log("Error:", err)
    }

    const paypalOnApprove = async (data, detail, plan_type) => {
        await updateUserSubscription({plan:plan_type, 
            genratedImages:Infinity, words:Infinity, 
            subscriptionID:data.subscriptionID}, dispatch);
        await subscribe({subscriptionID:data.subscriptionID, plan:plan_type});
    };


    return (
        <>
            <Helmet>
                <title>
                    Plans | AskSophia
                </title>
            </Helmet>
            <section className='xl:mx-[133px] mx-[40px] mt-[42px] lg:h-screen min-h-screen'>
                <div className="h-full">
                    <div className="max-w-5xl mx-auto">
                       {userWords < 0 && <div className="flex items-center justify-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800" role="alert">
                            <svg  className="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>
                            <span className="sr-only">Info</span>
                            <div>
                                <span className="font-medium">Upgrade Plan!</span> You have reached words limit Please upgrade your plan.
                            </div>
                        </div>}
                        <h2 className="text-3xl text-gray-800 font-bold text-center mb-4">Plans</h2>
                        <p className='text-[#585757] text-center mb-8 text-[16px] leading-[22px]'>Let us know about your problems</p>
                       {!isLoading ? <div className="flex flex-col lg:flex-row justify-center">
                            {plansState && plans && plans.length>0 &&
                            plans.map((plan, index) => {
                                return <div key={index} className="relative w-[325px] bg-white shadow-md rounded-sm border border-gray-200">
                                <div className="absolute top-0 left-0 right-0 h-0.5 bg-indigo-500" aria-hidden="true"></div>
                                <div className="px-5 pt-5 pb-6 border-b border-gray-200">
                                    <header className="flex items-center mb-2">
                                        <div className="w-6 h-6 rounded-full flex-shrink-0 bg-gradient-to-tr from-indigo-500 to-indigo-300 mr-3">
                                            <svg className="w-6 h-6 fill-current text-white" viewBox="0 0 24 24">
                                                <path d="M12 17a.833.833 0 01-.833-.833 3.333 3.333 0 00-3.334-3.334.833.833 0 110-1.666 3.333 3.333 0 003.334-3.334.833.833 0 111.666 0 3.333 3.333 0 003.334 3.334.833.833 0 110 1.666 3.333 3.333 0 00-3.334 3.334c0 .46-.373.833-.833.833z" />
                                            </svg>
                                        </div>
                                        <h3 className="text-lg text-gray-800 font-semibold">{plan.title}</h3>
                                    </header>
                                    <div className="text-gray-800 font-bold mb-4">
                                        <span className="text-2xl">$</span><span className="text-3xl">{plan.price}</span><span className="text-gray-500 font-medium text-sm">/mo</span>
                                    </div>
                                    <PaypalBtn
                                        planId={plan.plan_id}
                                        currency="USD"
                                        createSubscription={(data, actions) => paypalSubscribe(data, actions, plan.plan_id)}
                                        onApprove={(data, detail)=>paypalOnApprove(data, detail, "basic")}
                                        catchError={paypalOnError}
                                        onError={paypalOnError}
                                        onCancel={paypalOnError}
                                    />
                                    {/* <button onClick={updateUser}>click me</button> */}
                                </div>
                                <div className="px-5 pt-1 pb-5">
                                    <div className="text-xs text-gray-800 font-semibold uppercase mb-4">What's included</div>
                                    <ul>
                                        {plan.pros.map((item, index) => {
                                            return <li key={index} className="flex items-center py-1">
                                                <svg className="w-3 h-3 flex-shrink-0 fill-current text-green-500 mr-2" viewBox="0 0 12 12">
                                                    <path d="M10.28 1.28L3.989 7.575 1.695 5.28A1 1 0 00.28 6.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 1.28z" />
                                                </svg>
                                                <div className="text-sm">{item}</div>
                                            </li>
                                        })}
                                    </ul>
                                </div>
                            </div>
                            })
                            }
                        </div> : <div className='flex justify-center items-center h-full w-full'>
                        <Spinner className="w-24 h-24" />
                        </div>}
                    </div>
                </div>
            </section>
        </>
    )
}

export default Plans
const asyncHandler = require("express-async-handler");
const Plan = require("../models/planModel");

// @desc   Post a plan
// @route  POST /api/plan
// @access  Public
const postPlan = asyncHandler(async (req, res) => {
    const { price, pros, plan_id, plan_type } = req.body;

    if (!price || !pros || !plan_id || !plan_type) {
        res.status(401);
        throw new Error("All fields must be filled");
    }
    const newPlan = await Plan.create( req.body );
    res.status(200).json(newPlan);
});

// @desc   Get all plans
// @route  GET /api/plan
// @access  Public
const getPlans = asyncHandler(async (req, res) => {
 try {
    const page = Number(req.query.page);
    const pageSize = Number(req.query.pageSize) || 10;
    let plans = null;

    const total = await Plan.countDocuments();
    if(!page){
        plans = await Plan.find()
        .sort({ createdAt: -1 })
    } else{
        plans = await Plan.find()
        .sort({ createdAt: -1 })
        .skip(pageSize * (page - 1))
        .limit(pageSize);

    }
    if (!plans) {
        res.status(401);
        throw new Error("No plans found");
    }
    const pages = Math.ceil(total / pageSize);

    return res.status(200).json({plans, pages});
 } catch (error) {
        console.log(error)
        res.status(401);
        throw new Error("Error");
 }
});


// @desc   Get one plan
// @route  GET /api/plans/:id
// @access  Public
const getOnePlan = asyncHandler(async (req, res) => {
    const plan = await Plan.findById(req.params.id);
    if (!plan) {
        res.status(401);
        throw new Error("No plan found with this ID");
    }
    return res.status(201).json(plan);
});



// @desc   update plan
// @route  PUT /api/plans
// @access  Public
const putPlan = asyncHandler(async (req, res) => {
    const plan = await Plan.findById(req.params.id);
    if (!plan) {
        res.status(401);
        throw new Error("All fields must be filled");
    }
        const updatePlan = await Plan.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.status(201).json(updatePlan);
    
});

// @desc   DELETE plan
// @route  DELETE /api/PLAN/:id
// @access  Public
const deletePlan = asyncHandler(async (req, res) => {
    const plan = await Plan.findById(req.params.id);
    if (!plan) {
        res.status(401);
        throw new Error("No plan with this ID");
    }
    await plan.remove();
    res.status(201).json(req.params.id);
   
});

module.exports = {
    getPlans,
    getOnePlan,
    postPlan,
    putPlan,
    deletePlan,
}
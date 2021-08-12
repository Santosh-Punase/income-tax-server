var mongoose=require('mongoose');

const taxSchema=mongoose.Schema({
    year: {
        type: Number,
        required: true,
        maxlength: 100
    },
    age: {
        type: Number,
        required: true,
    },
    income: {
        type: Number,
        required: true,
    },
    declaredInvestment: {
        type: Number,
        required: true,
    },
    timestamp: {
        type: Number,
        required: true
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Tax', taxSchema);

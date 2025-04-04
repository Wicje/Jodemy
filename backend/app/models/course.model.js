export default (mongoose) => {
    let schema = mongoose.Schema(
        {
            title: String,
            description: String,
            published: Boolean,
        },
        {timestamps:true}
    );

    schema.method("toJSON", function(){
        const {_v,_id, ...object} = this.toObject();
        object.id = id;
        return object;
    });

    const Course = mongoose.model("course", schema);
    return Course;
};
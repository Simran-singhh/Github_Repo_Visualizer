const axios = require('axios');

const homepage_view = (req, res) => {
    res.render("index");
};

const homepage_git_username = (req, res) => {
    const username = req.body.username;
    res.redirect(`/${username}?page=1`); 
};

const homepage_render_profile = async (req,res) =>{
    try{
        const username = req.params.username;
        const page = parseInt(req.query.page) || 1

        const per_page = 6;

        
        const userDetailsUrl = `https://api.github.com/users/${username}`;

        const userDetailsResponse =  await axios.get(userDetailsUrl);
        const userDetails = await userDetailsResponse.data;
        const totalpage = Math.ceil(userDetails.public_repos/per_page);

        

        const repoDetailsUrl = `https://api.github.com/users/${username}/repos?per_page=${per_page}&page=${page}`;
        const repoDetailsResponse = await axios.get(repoDetailsUrl);
        const repoDetails = await repoDetailsResponse.data;
        res.render("profile/userprofile", { userdata : userDetails,  totalpage : totalpage, repo : repoDetails, currentpage : page } );

    }catch{

        res.status(404).render('404', { title: '404' });

    }
};

module.exports={
    homepage_view,
    homepage_git_username,
    homepage_render_profile
}
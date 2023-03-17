import { Box, VStack } from "@chakra-ui/react";
import NewPost from "./NewPost";
import Post from "./Post";

const Posts = [
  {
    user: "Leo Messi",
    image:
      "https://wallpapers.com/images/hd/4k-football-lionel-messi-number-0baki34kd2suqmtn.jpg",
    text: "Messiiiiii!!",
  },
  {
    user: "mohamed",
    image:
      "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/b3355004-e447-43d4-8f97-7067752dfe3d/daratdr-82de8041-38b4-4791-9d40-c6d16afd0eae.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2IzMzU1MDA0LWU0NDctNDNkNC04Zjk3LTcwNjc3NTJkZmUzZFwvZGFyYXRkci04MmRlODA0MS0zOGI0LTQ3OTEtOWQ0MC1jNmQxNmFmZDBlYWUuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.DF9tmuc5O3JnYrH037Me6BN6_3_kQs5UPW1eMUT6W4g",
    text: "I use arch btw",
  },
  {
    user: "ahmed",
    image: "https://blog.ippon.fr/content/images/2016/04/react-javascript.png",
    text: "I Love React",
  },
  {
    user: "angular",
    image:
      "https://cdn.searchenginejournal.com/wp-content/uploads/2019/04/the-seo-guide-to-angular.png",
    text: "I Love Angular",
  },
  {
    user: "Vue JS",
    image:
      "https://segwitz.com/wp-content/uploads/2021/06/vuejs-development-malaysia.jpeg",
    text: "I Love VueJS",
  },
  {
    user: "Svelte",
    image:
      "https://cdn.hashnode.com/res/hashnode/image/upload/v1619358925225/50e2XssdE.png",
    text: "I Love Svelte",
  },
];

const Feed = () => {
  return (
    <Box w="90%" mx="auto" mb={16}>
      <NewPost />
      <VStack spacing={16} mt={16}>
        {Posts.map((post) => (
          <Post post={post} />
        ))}
      </VStack>
    </Box>
  );
};

export default Feed;

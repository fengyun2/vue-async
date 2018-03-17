<template>
  <div class="main-container">
    <ul class="user-list">

    </ul>
  </div>
</template>

<script>
import { getUsers, getRateLimit,getMostStarsRepositories } from '@/api/github'
import { getTopics, getTopic } from '@/api/cnode'
export default {
  data() {
    return {
      users: []
    }
  },
  mounted() {
    this.fetchUser()
  },
  methods: {
     async fetchUser() {
      try {
        /* eslint-disable */
        const users = await getUsers();
        const rate_limits = await getRateLimit();
        const reps = await getMostStarsRepositories();
        const topics = await getTopics();
        const topicIds = topics.data.map(topic => topic.id);
        // console.log('topicIds: ', topicIds);
        this.fetchTopic(topicIds);
        this.users = users
        // console.log(users);
        /* eslint-enable */
      } catch(err) {
        console.log(err);
      }
    },
    async fetchTopic(ids) {
      try {
        if(Array.isArray(ids)) {
          const topics = ids.map((id) => getTopic(id))
          const results = [];

          // 多个请求并发，可以使用 Promise.all 方法

          // results.push(await Promise.all(topics))
          // 或者使用下面的写法
          for(const topic of topics) {
            results.push(await topic)
          }
          console.log(results);
        }
      }catch(err) {
        console.log(err);
      }
    }
  }
}
</script>

<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
}
.user-list {
  list-style-type: none;
  li {
    img {
      width: 60px;
      height: 60px;
      vertical-align: middle;
    }
  }
}
</style>


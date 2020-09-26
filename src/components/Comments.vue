<template>
  <section class="comments">
      <h3>{{ label }}</h3>
      <ul>
        <li
          v-for="(item) in slicedComments"
          :key="item.id"
        >
          <BaseComment v-bind="item.items[0]" class="main" />

          <button
            class="collapse-button"
            @click="toggle(item.id)"
          >
            {{ collapsed[item.id] ? show : hide }}
          </button>

          <ul :class="['secondary', collapsed[item.id] && 'collapsed']">
            <template
              v-for="(comment, ind) in item.items"
            >
              <li
                v-if="ind"
                :key="comment.id"
              >
                <BaseComment v-bind="comment" />
              </li>
            </template>
          </ul>
        </li>
      </ul>

      <Trigger @inview="updateCurrentInd" />
    </section>
</template>

<script>
import BaseComment from './BaseComment'
import Trigger from './Trigger'

const COMMENTS_DISPLAY_STEP = 5

export default {
  name: 'Comments',

  components: { BaseComment, Trigger },

  props: {
    label: {
      type: String,
      required: true
    },
    items: {
      type: Array,
      required: true
    },
    show: String,
    hide: String
  },

  data () {
    return {
      collapsed: {},
      currentInd: COMMENTS_DISPLAY_STEP
    }
  },

  computed: {
    comments () {
      const comments = this.items.reduce((acc, current) => {
        const currentId = current.postId
        const postGroup = acc.find(item => item.id === currentId)
        if (postGroup) postGroup.items.push(current)
        else {
          acc.push({ id: currentId, items: [current] })
        }
        return acc
      }, [])
      return comments
    },
    slicedComments () {
      return this.comments.slice(0, this.currentInd)
    }
  },

  mounted () {
    const __unwatch = this.$watch('comments', function () {
      const collapsed = {}
      Object.keys(this.comments).forEach(postId => {
        this.$set(collapsed, postId, true)
      })
      this.collapsed = { ...collapsed }
      __unwatch()
    })
  },

  methods: {
    toggle (id) {
      const currentVal = this.collapsed[id]
      this.$set(this.collapsed, id, !currentVal)
    },
    updateCurrentInd () {
      this.currentInd += COMMENTS_DISPLAY_STEP
    }
  }
}
</script>

<style scoped>
  .comments > ul {
    padding-bottom: 50px;
    overflow: hidden;
    list-style-type: none;
  }

  .main {
    padding: 10px 20px;
    background-color: var(--light-gray);
  }

  .secondary {
    max-height: 2000px;
    opacity: 1;
    transition: max-height 1s, opacity 0.3s;
    overflow: hidden;
  }

  .secondary.collapsed {
    max-height: 0;
    opacity: 0;
  }

  .collapse-button {
    margin-top: 20px;
    margin-bottom: 20px;
    padding: 10px 15px;
    border: 0;
    background: white;
  }
</style>

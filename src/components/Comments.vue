<template>
  <section class="comments">
      <h3>{{ label }}</h3>
      <ul>
        <li
          v-for="(item, key) in comments"
          :key="key"
        >
          <BaseComment v-bind="item[0]" class="main" />

          <button
            class="collapse-button"
            @click="toggle(key)"
          >
            {{ collapsed[key] ? buttonLabelShow : buttonLabelHide }}
          </button>

          <ul :class="['secondary', collapsed[key] && 'collapsed']">
            <template
              v-for="(comment, ind) in item"
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
    </section>
</template>

<script>
import BaseComment from './BaseComment'

export default {
  name: 'Comments',

  components: { BaseComment },

  props: {
    label: {
      type: String,
      required: true
    },
    items: {
      type: Array,
      required: true
    }
  },

  data () {
    return {
      buttonLabelShow: 'Show replies...',
      buttonLabelHide: 'Hide replies...',
      collapsed: {}
    }
  },

  computed: {
    comments () {
      const comments = this.items.reduce((acc, current) => {
        let currentId = current.postId
        if (acc.hasOwnProperty(currentId)) acc[currentId].push(current)
        else acc[currentId] = [current]
        return acc
      }, {})
      return comments
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
    }
  }
}
</script>

<style scoped>
  .comments ul {
    list-style-type: none;
  }

  .main {
    padding: 10px 20px;
    background-color: var(--light-gray);
  }

  .secondary {
    max-height: 2000px;
    transition: max-height 1s;
    overflow: hidden;
  }

  .secondary.collapsed {
    max-height: 0;
  }

  .collapse-button {
    margin-top: 20px;
    margin-bottom: 20px;
    padding: 10px 15px;
    border: 0;
    background: white;
  }
</style>

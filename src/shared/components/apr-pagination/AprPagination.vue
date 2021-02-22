<template>
  <div class="columns">
    <div class="column is-2 is-offset-5">
      <nav class="pagination is-centered">
        <ul class="pagination-list">
          <li>
            <span class="pagination-link is-current">
              {{ meta.page }}
            </span>
          </li>
        </ul>

        <button
          :disabled="!isPreviousPage"
          class="pagination-previous button"
          type="button"
          @click="emit('previous', meta.previousPage)"
        >
          <FontAwesomeIcon :icon="icon.left" />
        </button>

        <button
          :disabled="!isNextPage"
          class="pagination-next button"
          type="button"
          @click="emit('next', meta.nextPage)"
        >
          <FontAwesomeIcon :icon="icon.right" />
        </button>
      </nav>
    </div>
  </div>
</template>

<script src="./apr-pagination.js"></script>

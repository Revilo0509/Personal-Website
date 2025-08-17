<script lang="ts">
    import Box from "$lib/components/Box.svelte";
    import List from "$lib/components/List.svelte";
</script>

<ul>
    <li><Box><List name="Phrases" list={["Hi", "Hello", "Hey"]} /></Box></li>
    <li><Box><List list={[""]}></List></Box></li>
</ul>

<!--<Box>Hello<Box hoverEffect={true} color="red">Yo</Box></Box>-->

<style>
    ul {
        display: flex;
        flex-wrap: wrap;
        list-style: none;
    }
    li {
        flex: 1 1 calc(100% / 3);
        align-self: flex-start;
    }

    @media (max-width: 768px) {
        li {
            flex: 1 1 calc(100% / 2);
        }
    }

    @media (max-width: 480px) {
        li {
            flex: 1 1 100%;
        }
    }
</style>

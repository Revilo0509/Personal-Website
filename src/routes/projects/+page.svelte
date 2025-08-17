<script lang="ts">
    import Box from "$lib/components/Box.svelte";
    import List from "$lib/components/List.svelte";
</script>

<Box>
    Hello, World!
    <Box color="Red" hoverEffect={true}><a href="/">a</a></Box>
</Box>

<Box><List list={["Hey", "Hi", "Hello"]}></List></Box>